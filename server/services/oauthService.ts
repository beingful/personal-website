import { randomBytes } from 'node:crypto';

import type { OAuthProviderConfig } from '../types';

export interface OAuthService {
  getAuthorizationUrl(providerKey: string): {
    readonly authorizationUrl: string;
    readonly state: string;
  };
  getEmailFromIdentityToken(
    providerKey: string,
    code: string,
    isValidEmail: (value: string) => boolean
  ): Promise<string>;
}

export const createOAuthService = ({
  oauthProviderConfigMap,
  publicAppUrl
}: {
  readonly oauthProviderConfigMap: Readonly<Record<string, OAuthProviderConfig>>;
  readonly publicAppUrl: string;
}): OAuthService => {
  const getRedirectUri = (providerKey: string): string =>
    new URL(oauthProviderConfigMap[providerKey].redirectPath, publicAppUrl).toString();

  const decodeJwtPayload = (jwtValue: string): Record<string, unknown> => {
    const parts = jwtValue.split('.');

    if (parts.length < 2) {
      throw new Error('Invalid identity token.');
    }

    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const normalizedPayload = payload.padEnd(Math.ceil(payload.length / 4) * 4, '=');

    return JSON.parse(Buffer.from(normalizedPayload, 'base64').toString('utf8')) as Record<string, unknown>;
  };

  const exchangeAuthorizationCode = async (
    providerKey: string,
    code: string
  ): Promise<Record<string, unknown>> => {
    const providerConfig = oauthProviderConfigMap[providerKey];
    const tokenResponse = await fetch(providerConfig.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: providerConfig.clientId,
        client_secret: providerConfig.clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: getRedirectUri(providerKey)
      })
    });

    if (!tokenResponse.ok) {
      throw new Error(`Token exchange failed for ${providerKey}.`);
    }

    return (await tokenResponse.json()) as Record<string, unknown>;
  };

  const ensureProviderConfigured = (providerKey: string): void => {
    const providerConfig = oauthProviderConfigMap[providerKey];

    if (!providerConfig.clientId || !providerConfig.clientSecret) {
      throw new Error(`${providerKey} OAuth credentials are not configured.`);
    }
  };

  const getAuthorizationUrl = (providerKey: string) => {
    ensureProviderConfigured(providerKey);

    const providerConfig = oauthProviderConfigMap[providerKey];
    const state = randomBytes(24).toString('hex');
    const authorizationUrl = new URL(providerConfig.authorizationUrl);

    authorizationUrl.searchParams.set('client_id', providerConfig.clientId);
    authorizationUrl.searchParams.set('redirect_uri', getRedirectUri(providerKey));
    authorizationUrl.searchParams.set('response_type', 'code');
    authorizationUrl.searchParams.set('scope', providerConfig.scopes.join(' '));
    authorizationUrl.searchParams.set('state', state);
    authorizationUrl.searchParams.set('prompt', 'select_account');

    return {
      authorizationUrl: authorizationUrl.toString(),
      state
    };
  };

  const getEmailFromIdentityToken = async (
    providerKey: string,
    code: string,
    validateEmail: (value: string) => boolean
  ): Promise<string> => {
    ensureProviderConfigured(providerKey);

    const tokenResult = await exchangeAuthorizationCode(providerKey, code);
    const identityToken = typeof tokenResult.id_token === 'string' ? tokenResult.id_token : '';

    if (!identityToken) {
      throw new Error('Identity token is missing from the provider response.');
    }

    const tokenPayload = decodeJwtPayload(identityToken);
    const candidateValues = [tokenPayload.email, tokenPayload.preferred_username, tokenPayload.upn];
    const email =
      candidateValues.find((value) => typeof value === 'string' && validateEmail(value.trim())) ?? '';

    if (!email || typeof email !== 'string') {
      throw new Error('Unable to read an email address from the provider response.');
    }

    return email;
  };

  return {
    getAuthorizationUrl,
    getEmailFromIdentityToken
  };
};
