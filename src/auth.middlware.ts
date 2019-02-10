import { IHTTP } from 'utils';

export const checkAuth = (filter) => (HTTP: IHTTP) => {
  const {req, res} = HTTP;
  if (!filter(req)) {
    return HTTP;
  }
  // Do authorization logic here
  if (req.headers['authorization'] === 'test') {
    return HTTP;
  }
  // return error. User not authorized
  const err = new Error('UnAuthorized access');
  (err as any).status = 401;
  return {req, res, handler: Promise.reject(err)};
};