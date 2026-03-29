import type { IncomingMessage } from 'node:http';

export const getCookieMap = (request: IncomingMessage): Record<string, string> => {
  const cookieHeader = request.headers.cookie;

  if (!cookieHeader) {
    return {};
  }

  return Object.fromEntries(
    cookieHeader.split(';').map((item) => {
      const [key, ...rest] = item.trim().split('=');
      return [key, decodeURIComponent(rest.join('='))];
    })
  );
};

export const buildCookieHeader = (name: string, value: string, maxAgeSeconds: number): string =>
  `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}`;

export const clearCookieHeader = (name: string): string =>
  `${name}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
