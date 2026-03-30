import type { IncomingMessage, ServerResponse } from 'node:http';

export interface OAuthProviderConfig {
  readonly authorizationUrl: string;
  readonly clientId: string;
  readonly clientSecret: string;
  readonly redirectPath: string;
  readonly scopes: readonly string[];
  readonly stateCookieName: string;
  readonly tokenUrl: string;
}

export interface ServerConfig {
  readonly authSessionCookieMaxAgeSeconds: number;
  readonly authSessionCookieName: string;
  readonly azureBlobTypeHeaderValue: string;
  readonly azureStorageServiceVersion: string;
  readonly azureBlobVisitDirectoryUrl: string;
  readonly host: string;
  readonly azureStorageAccountKey: string;
  readonly distDirectoryPath: string;
  readonly mimeTypeMap: Readonly<Record<string, string>>;
  readonly oauthProviderConfigMap: Readonly<Record<string, OAuthProviderConfig>>;
  readonly oauthStateCookieMaxAgeSeconds: number;
  readonly port: number;
  readonly projectRootPath: string;
  readonly publicAppUrl: string;
}

export interface JsonResponsePayload {
  readonly [key: string]: unknown;
}

export type RouteHandler = (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage>
) => Promise<void> | void;
