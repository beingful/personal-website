import type { IncomingMessage, ServerResponse } from 'node:http';

import type { StaticFileService } from '../services/staticFileService';

export interface StaticController {
  handleStaticRequest(
    requestPath: string,
    response: ServerResponse<IncomingMessage>
  ): Promise<boolean>;
}

export const createStaticController = ({
  staticFileService
}: {
  readonly staticFileService: StaticFileService;
}): StaticController => {
  const handleStaticRequest = async (
    requestPath: string,
    response: ServerResponse<IncomingMessage>
  ): Promise<boolean> => {
    const staticFileServed = await staticFileService.serveStaticFile(requestPath, response);

    if (staticFileServed) {
      return true;
    }

    const fallbackServed = await staticFileService.serveStaticFile('/index.html', response);

    if (!fallbackServed) {
      response.writeHead(404);
      response.end('Not found');
    }

    return true;
  };

  return {
    handleStaticRequest
  };
};
