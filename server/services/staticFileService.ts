import { stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { extname, resolve } from 'node:path';
import type { IncomingMessage, ServerResponse } from 'node:http';

export interface StaticFileService {
  serveStaticFile(
    requestPath: string,
    response: ServerResponse<IncomingMessage>
  ): Promise<boolean>;
}

export const createStaticFileService = ({
  distDirectoryPath,
  mimeTypeMap
}: {
  readonly distDirectoryPath: string;
  readonly mimeTypeMap: Readonly<Record<string, string>>;
}): StaticFileService => {
  const serveStaticFile = async (
    requestPath: string,
    response: ServerResponse<IncomingMessage>
  ): Promise<boolean> => {
    const sanitizedPath = requestPath === '/' ? '/index.html' : requestPath;
    const filePath = resolve(distDirectoryPath, `.${sanitizedPath}`);

    if (!filePath.startsWith(distDirectoryPath)) {
      response.writeHead(403);
      response.end();
      return true;
    }

    try {
      const fileStats = await stat(filePath);

      if (!fileStats.isFile()) {
        return false;
      }

      response.writeHead(200, {
        'Content-Type': mimeTypeMap[extname(filePath)] ?? 'application/octet-stream'
      });
      createReadStream(filePath).pipe(response);
      return true;
    } catch {
      return false;
    }
  };

  return {
    serveStaticFile
  };
};
