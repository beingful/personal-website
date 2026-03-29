import type { IncomingMessage, OutgoingHttpHeaders, ServerResponse } from 'node:http';

import type { JsonResponsePayload } from '../types';

export const sendJson = (
  response: ServerResponse<IncomingMessage>,
  statusCode: number,
  payload: JsonResponsePayload
): void => {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8'
  });
  response.end(JSON.stringify(payload));
};

export const redirect = (
  response: ServerResponse<IncomingMessage>,
  location: string,
  cookieHeaders: readonly string[] = []
): void => {
  const headers: OutgoingHttpHeaders = {
    Location: location
  };

  if (cookieHeaders.length > 0) {
    headers['Set-Cookie'] = [...cookieHeaders];
  }

  response.writeHead(302, headers);
  response.end();
};
