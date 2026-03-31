import { createHmac } from 'node:crypto';
import { request as httpsRequest } from 'node:https';

export interface VisitStorageService {
  appendVisit(email: string, providerKey: string): Promise<void>;
  appendNamedVisit(name: string): Promise<void>;
  isValidName(value: string): boolean;
  isValidEmail(value: string): boolean;
}

export const isValidEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
export const isValidName = (value: string): boolean => value.trim().length > 0;

const normalizeDirectoryUrl = (directoryUrl: string): string =>
  directoryUrl.endsWith('/') ? directoryUrl : `${directoryUrl}/`;

const buildBlobFileName = (identifier: string, visitedAt: string): string => {
  const normalizedTimestamp = visitedAt.replace(/:/g, '-');
  const normalizedIdentifier = identifier
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9._-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');

  return `${normalizedTimestamp}__${normalizedIdentifier || 'visitor'}.json`;
};

const buildAuthorizationHeader = ({
  accountKey,
  accountName,
  blobTypeHeaderValue,
  canonicalizedResourcePath,
  contentLength,
  contentType,
  requestDate,
  storageServiceVersion
}: {
  readonly accountKey: string;
  readonly accountName: string;
  readonly blobTypeHeaderValue: string;
  readonly canonicalizedResourcePath: string;
  readonly contentLength: number;
  readonly contentType: string;
  readonly requestDate: string;
  readonly storageServiceVersion: string;
}): string => {
  const canonicalizedHeaders = [
    `x-ms-blob-type:${blobTypeHeaderValue}`,
    `x-ms-date:${requestDate}`,
    `x-ms-version:${storageServiceVersion}`
  ].join('\n');

  const stringToSign = [
    'PUT',
    '',
    '',
    String(contentLength),
    '',
    contentType,
    '',
    '',
    '',
    '',
    '',
    '',
    canonicalizedHeaders,
    `/${accountName}${canonicalizedResourcePath}`
  ].join('\n');

  const signature = createHmac('sha256', Buffer.from(accountKey, 'base64'))
    .update(stringToSign, 'utf8')
    .digest('base64');

  return `SharedKey ${accountName}:${signature}`;
};

export const createVisitStorageService = ({
  blobTypeHeaderValue,
  blobDirectoryUrl,
  storageAccountKey,
  storageServiceVersion
}: {
  readonly blobTypeHeaderValue: string;
  readonly blobDirectoryUrl: string;
  readonly storageAccountKey: string;
  readonly storageServiceVersion: string;
}): VisitStorageService => {
  const appendPayload = async (identifier: string, payload: Record<string, string>): Promise<void> => {
    const visitedAt = new Date().toISOString();
    const requestDate = new Date().toUTCString();
    const directoryUrl = new URL(normalizeDirectoryUrl(blobDirectoryUrl));
    const accountName = directoryUrl.hostname.split('.')[0] ?? '';
    const pathnameSegments = directoryUrl.pathname.split('/').filter(Boolean);
    const [containerName, ...directoryPathSegments] = pathnameSegments;

    if (!accountName || !containerName) {
      throw new Error('Azure Blob visit directory URL is not valid.');
    }

    const blobFileName = buildBlobFileName(identifier, visitedAt);
    const blobName = [...directoryPathSegments, blobFileName].join('/');
    const blobUrl = new URL(directoryUrl.origin);
    const encodedBlobPath = blobName.split('/').map(encodeURIComponent).join('/');

    blobUrl.pathname = `/${containerName}/${encodedBlobPath}`;

    const requestPayload = JSON.stringify(
      {
        ...payload,
        visitedAt
      },
      null,
      2
    );
    const contentType = 'application/json; charset=utf-8';
    const contentLength = Buffer.byteLength(requestPayload, 'utf8');
    const headers: Record<string, string> = {
      'Content-Length': String(contentLength),
      'Content-Type': contentType,
      'x-ms-blob-type': blobTypeHeaderValue,
      'x-ms-date': requestDate,
      'x-ms-version': storageServiceVersion
    };

    if (!storageAccountKey.trim()) {
      throw new Error('Azure Blob Storage account key is not configured.');
    }

    headers.Authorization = buildAuthorizationHeader({
      accountKey: storageAccountKey,
      accountName,
      blobTypeHeaderValue,
      canonicalizedResourcePath: blobUrl.pathname,
      contentLength,
      contentType,
      requestDate,
      storageServiceVersion
    });

    await new Promise<void>((resolve, reject) => {
      const request = httpsRequest(
        blobUrl,
        {
          headers,
          method: 'PUT'
        },
        (response) => {
          const responseChunks: Buffer[] = [];

          response.on('data', (chunk) => {
            responseChunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
          });

          response.on('end', () => {
            if (response.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
              resolve();
              return;
            }

            const responseBody = Buffer.concat(responseChunks).toString('utf8').trim();

            reject(
              new Error(
                responseBody
                  ? `Azure Blob upload failed: ${response.statusCode ?? 500} ${responseBody}`
                  : `Azure Blob upload failed: ${response.statusCode ?? 500}.`
              )
            );
          });
        }
      );

      request.on('error', reject);
      request.write(requestPayload, 'utf8');
      request.end();
    });
  };

  const appendVisit = async (email: string, providerKey: string): Promise<void> => {
    await appendPayload(email, {
      email: email.trim().toLowerCase(),
      providerKey
    });
  };

  const appendNamedVisit = async (name: string): Promise<void> => {
    await appendPayload(name, {
      name: name.trim()
    });
  };

  return {
    appendVisit,
    appendNamedVisit,
    isValidName,
    isValidEmail
  };
};
