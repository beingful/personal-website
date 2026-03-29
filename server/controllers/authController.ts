import { randomBytes } from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';

import { buildCookieHeader, clearCookieHeader, getCookieMap } from '../services/cookieService';
import { redirect, sendJson } from '../services/httpResponseService';
import type { OAuthService } from '../services/oauthService';
import type { VisitStorageService } from '../services/visitStorageService';
import type { OAuthProviderConfig } from '../types';

export interface AuthController {
  handleAuthCallback(
    providerKey: string,
    request: IncomingMessage,
    response: ServerResponse<IncomingMessage>
  ): Promise<void>;
  handleAuthSessionRequest(
    request: IncomingMessage,
    response: ServerResponse<IncomingMessage>
  ): void;
  handleAuthStart(providerKey: string, response: ServerResponse<IncomingMessage>): void;
}

export const createAuthController = ({
  authSessionCookieMaxAgeSeconds,
  authSessionCookieName,
  authSessionStore,
  oauthProviderConfigMap,
  oauthService,
  oauthStateCookieMaxAgeSeconds,
  publicAppUrl,
  visitStorageService
}: {
  readonly authSessionCookieMaxAgeSeconds: number;
  readonly authSessionCookieName: string;
  readonly authSessionStore: Set<string>;
  readonly oauthProviderConfigMap: Readonly<Record<string, OAuthProviderConfig>>;
  readonly oauthService: OAuthService;
  readonly oauthStateCookieMaxAgeSeconds: number;
  readonly publicAppUrl: string;
  readonly visitStorageService: VisitStorageService;
}): AuthController => {
  const handleAuthStart = (providerKey: string, response: ServerResponse<IncomingMessage>): void => {
    try {
      const providerConfig = oauthProviderConfigMap[providerKey];
      const { authorizationUrl, state } = oauthService.getAuthorizationUrl(providerKey);

      redirect(response, authorizationUrl, [
        buildCookieHeader(providerConfig.stateCookieName, state, oauthStateCookieMaxAgeSeconds)
      ]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to start sign-in.';
      redirect(
        response,
        `${publicAppUrl}/?auth=sign-in-error&message=${encodeURIComponent(message)}`
      );
    }
  };

  const handleAuthCallback = async (
    providerKey: string,
    request: IncomingMessage,
    response: ServerResponse<IncomingMessage>
  ): Promise<void> => {
    const providerConfig = oauthProviderConfigMap[providerKey];

    try {
      const requestUrl = new URL(request.url ?? '/', publicAppUrl);
      const code = requestUrl.searchParams.get('code');
      const state = requestUrl.searchParams.get('state');
      const cookieMap = getCookieMap(request);
      const storedState = cookieMap[providerConfig.stateCookieName];

      if (!code || !state || !storedState || state !== storedState) {
        throw new Error('Sign-in validation failed.');
      }

      const email = await oauthService.getEmailFromIdentityToken(
        providerKey,
        code,
        visitStorageService.isValidEmail
      );

      await visitStorageService.appendVisit(email, providerKey);
      const authSessionId = randomBytes(24).toString('hex');

      authSessionStore.add(authSessionId);
      redirect(response, `${publicAppUrl}/?auth=sign-in-success`, [
        clearCookieHeader(providerConfig.stateCookieName),
        buildCookieHeader(authSessionCookieName, authSessionId, authSessionCookieMaxAgeSeconds)
      ]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unexpected sign-in error.';

      redirect(
        response,
        `${publicAppUrl}/?auth=sign-in-error&message=${encodeURIComponent(message)}`,
        [clearCookieHeader(providerConfig.stateCookieName)]
      );
    }
  };

  const handleAuthSessionRequest = (
    request: IncomingMessage,
    response: ServerResponse<IncomingMessage>
  ): void => {
    if (request.method !== 'GET') {
      response.writeHead(405, { Allow: 'GET' });
      response.end();
      return;
    }

    const cookieMap = getCookieMap(request);
    const authSessionId = cookieMap[authSessionCookieName];
    const isAuthenticated =
      typeof authSessionId === 'string' && authSessionStore.has(authSessionId);

    sendJson(response, 200, {
      isAuthenticated
    });
  };

  return {
    handleAuthCallback,
    handleAuthSessionRequest,
    handleAuthStart
  };
};
