import {IncomingMessage, ServerResponse } from 'http';

export interface IHTTP {
  req: IncomingMessage;
  res: ServerResponse;
  handler?: Promise<any>;
}
export interface IExtError extends Error {
  status?: number;
}

export const routerUtils = {
  disableRoute: (): Promise<never> => {
    const err: IExtError = new Error('Not actived');
    err.status = 404;
    return Promise.reject(err);
  }
};