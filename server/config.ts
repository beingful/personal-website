import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { ServerConfig } from './types';

const serverDirectoryPath = fileURLToPath(new URL('.', import.meta.url));
const projectRootPath = resolve(serverDirectoryPath, '..');

export const serverConfig: ServerConfig = {
  authSessionCookieMaxAgeSeconds: 60 * 60 * 24 * 30,
  authSessionCookieName: 'personal_website_auth_session',
  azureBlobTypeHeaderValue: process.env.AZURE_BLOB_TYPE_HEADER_VALUE ?? 'BlockBlob',
  azureBlobVisitDirectoryUrl:
    process.env.AZURE_BLOB_VISIT_DIRECTORY_URL ??
    'https://hannakasaistorage.blob.core.windows.net/personal-website/visits/',
  azureStorageAccountKey: process.env.AZURE_STORAGE_ACCOUNT_KEY ?? '',
  azureStorageServiceVersion: process.env.AZURE_STORAGE_SERVICE_VERSION ?? '2023-11-03',
  host: process.env.HOST ?? '0.0.0.0',
  distDirectoryPath: resolve(projectRootPath, 'dist'),
  mimeTypeMap: {
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.ico': 'image/x-icon',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.pdf': 'application/pdf',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.txt': 'text/plain; charset=utf-8'
  },
  oauthProviderConfigMap: {
    google: {
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      redirectPath: '/auth/google/callback',
      scopes: ['openid', 'email', 'profile'],
      stateCookieName: 'oauth_state_google',
      tokenUrl: 'https://oauth2.googleapis.com/token'
    },
    microsoft: {
      authorizationUrl: 'https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize',
      clientId: process.env.MICROSOFT_CLIENT_ID ?? '',
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET ?? '',
      redirectPath: '/auth/microsoft/callback',
      scopes: ['openid', 'email', 'profile'],
      stateCookieName: 'oauth_state_microsoft',
      tokenUrl: 'https://login.microsoftonline.com/organizations/oauth2/v2.0/token'
    }
  },
  oauthStateCookieMaxAgeSeconds: 600,
  port: Number(process.env.PORT ?? '3001'),
  projectRootPath,
  publicAppUrl: process.env.PUBLIC_APP_URL ?? 'http://localhost:5173'
};
