import type { IncomingMessage, ServerResponse } from 'node:http';

import type { AuthController } from '../controllers/authController';
import type { StaticController } from '../controllers/staticController';
import type { RouteHandler } from '../types';

export interface Router {
  routeRequest(
    request: IncomingMessage,
    response: ServerResponse<IncomingMessage>
  ): Promise<void>;
}

export const createRouter = ({
  authController,
  staticController
}: {
  readonly authController: AuthController;
  readonly staticController: StaticController;
}): Router => {
  const routeHandlers = new Map<string, RouteHandler>([
    [
      '/auth/google/start',
      (_request, response) => authController.handleAuthStart('google', response)
    ],
    [
      '/auth/microsoft/start',
      (_request, response) => authController.handleAuthStart('microsoft', response)
    ],
    [
      '/auth/google/callback',
      (request, response) => authController.handleAuthCallback('google', request, response)
    ],
    [
      '/auth/microsoft/callback',
      (request, response) => authController.handleAuthCallback('microsoft', request, response)
    ],
    [
      '/api/auth/session',
      (request, response) => authController.handleAuthSessionRequest(request, response)
    ],
    [
      '/api/auth/name-access',
      (request, response) => authController.handleAnonymousAccessRequest(request, response)
    ]
  ]);

  const routeRequest = async (
    request: IncomingMessage,
    response: ServerResponse<IncomingMessage>
  ): Promise<void> => {
    const requestUrl = new URL(request.url ?? '/', `http://${request.headers.host}`);
    const routeHandler = routeHandlers.get(requestUrl.pathname);

    if (routeHandler) {
      await routeHandler(request, response);
      return;
    }

    await staticController.handleStaticRequest(requestUrl.pathname, response);
  };

  return {
    routeRequest
  };
};
