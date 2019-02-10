import { IHTTP, IExtError } from 'utils';
import { IncomingMessage } from 'http';

export const checkAuth = (filter: (req: IncomingMessage) => boolean) => (HTTP: IHTTP) => {
  const {req, req: {headers = {}}, res} = HTTP;
  if (!filter(req)) {
    return HTTP;
  }
  // Do authorization logic here
  if (headers['authorization'] === 'test') {
    return HTTP;
  }
  // return error. User not authorized
  const err: IExtError = new Error('UnAuthorized access');
  err.status = 401;
  return {req, res, handler: Promise.reject(err)};
};