import {IncomingMessage, ServerResponse } from 'http';

export interface IHTTP {
  req: IncomingMessage;
  res: ServerResponse;
  handler?: Promise<any>;
}

export const routerUtils = {
  disableRoute: (): Promise<never> => {
    const err = new Error('Not actived');
    (err as any).status = 404;
    return Promise.reject(err);
  }
};