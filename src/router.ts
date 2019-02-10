import { Subject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { checkAuth } from './auth.middlware';
import { IHTTP, routerUtils } from './utils';


export class RxRouter {

  static parseRoutes(callback = null) {
    // notice that we return a function here
    return (source: Subject<IHTTP>) => source.pipe(
      map(this.route('GET', '/', () => Promise.resolve('hello, world'))),
      map(this.route('GET', '/test', () => Promise.resolve('hello test'))),
      map(this.route('GET', '/test2', routerUtils.disableRoute)),
      map(checkAuth(req => req.url.startsWith('/auth'))),
      map(this.route('GET', '/auth/private', () => Promise.resolve('hello private'))),
      this.notFoundHandler(),
      catchError(err => err)
    );
  }

  static route(method: string, url: string, cb: any) {
    return (HTTP: IHTTP) => {
      const {req, res, handler} = HTTP;
      // exclude url
      if (req.url !== url) return HTTP;
      // exclude method
      if (req.method !== method.toLocaleUpperCase()) return HTTP;
      // buuild handler HTTP
      const newHandler: Promise<any> = (handler)
        ? handler.then(cb(req))
        : cb(req);
      // return HTTP with updated handler
      return {req, res, handler: newHandler};
    };
  }

  static notFoundHandler(): (source: Subject<IHTTP>) => (Observable<IHTTP>) {
    return (source) => source.pipe(
      map(value => {
        const {req, res, handler = null} = value;
        return (!handler)
          ? {
              req,
              res,
              handler: Promise.reject({
                    message: `${req.url} not found`,
                    status: 404
                  })
            }
          : value;
      }),
    );
  }

}
