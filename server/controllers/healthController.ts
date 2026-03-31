import type { IncomingMessage, ServerResponse } from 'node:http';

export interface HealthController {
  handlePulseRequest(request: IncomingMessage, response: ServerResponse<IncomingMessage>): void;
}

export const createHealthController = (): HealthController => {
  const handlePulseRequest = (
    request: IncomingMessage,
    response: ServerResponse<IncomingMessage>
  ): void => {
    if (request.method !== 'GET') {
      response.writeHead(405, { Allow: 'GET' });
      response.end();
      return;
    }

    response.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8'
    });
    response.end('OK');
  };

  return {
    handlePulseRequest
  };
};
