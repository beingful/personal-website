import { createServer } from 'node:http';

import { serverConfig } from './config';
import { createAuthController } from './controllers/authController';
import { createStaticController } from './controllers/staticController';
import { createRouter } from './router/createRouter';
import { createOAuthService } from './services/oauthService';
import { createStaticFileService } from './services/staticFileService';
import { createVisitStorageService } from './services/visitStorageService';

const authSessionStore = new Set<string>();

const visitStorageService = createVisitStorageService({
  blobTypeHeaderValue: serverConfig.azureBlobTypeHeaderValue,
  blobDirectoryUrl: serverConfig.azureBlobVisitDirectoryUrl,
  storageAccountKey: serverConfig.azureStorageAccountKey,
  storageServiceVersion: serverConfig.azureStorageServiceVersion
});

const oauthService = createOAuthService({
  oauthProviderConfigMap: serverConfig.oauthProviderConfigMap,
  publicAppUrl: serverConfig.publicAppUrl
});

const staticFileService = createStaticFileService({
  distDirectoryPath: serverConfig.distDirectoryPath,
  mimeTypeMap: serverConfig.mimeTypeMap
});

const authController = createAuthController({
  authSessionCookieMaxAgeSeconds: serverConfig.authSessionCookieMaxAgeSeconds,
  authSessionCookieName: serverConfig.authSessionCookieName,
  authSessionStore,
  oauthProviderConfigMap: serverConfig.oauthProviderConfigMap,
  oauthService,
  oauthStateCookieMaxAgeSeconds: serverConfig.oauthStateCookieMaxAgeSeconds,
  publicAppUrl: serverConfig.publicAppUrl,
  visitStorageService
});

const staticController = createStaticController({
  staticFileService
});

const router = createRouter({
  authController,
  staticController
});

const server = createServer(async (request, response) => {
  await router.routeRequest(request, response);
});

server.listen(serverConfig.port, () => {
  console.log(`Server listening on http://localhost:${serverConfig.port}`);
});
