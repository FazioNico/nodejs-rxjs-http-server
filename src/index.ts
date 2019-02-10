import { fromEvent } from 'rxjs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as http from 'http';
import { RxRouter } from './router';
import { IHTTP } from './utils';

export class RxHttpServer {

  public readonly server: http.Server;
  private readonly _request$: Observable<any>;
  private readonly _host: string;
  private readonly _port: number;
  // define middelwares
  private readonly _logger = (HTTP: IHTTP) => {
    const {req} = HTTP;
    console.log(`[LOG]: Request ${req.method} to ${req.url}`);
  }

  constructor(parameters) {
    Object.assign(this, parameters);
    // create http server
    this.server = http.createServer();
    // create Observable for Request incoming
    this._request$ = fromEvent(this.server, 'request').pipe(
      // formating event data
      map((HTTP: [http.IncomingMessage, http.ServerResponse, any]): IHTTP => {
        const [req, res, handler = null] = HTTP;
        return {req, res, handler};
      }),
      // add middlewares
      tap(this._logger),
      // add routing
      RxRouter.parseRoutes()
    );
    // bootstrap all
    this._bootstrap();
  }

  // tslint:disable-next-line:member-ordering
  static async start(options: {host: string, port: number} = null): Promise<RxHttpServer> {
    const {host = 'localhost', port = 3000} = options || {};
    const server = new RxHttpServer({_host: host, _port: port});
    return Promise.resolve(server);
  }

  private _listenRequests(): void {
    this._request$.subscribe(
      async (HTTP: IHTTP) => {
        const {req, res, handler} = HTTP;
        if (!handler) {
          res.statusCode = 404;
          return res.end('404');
        }
        handler.then(
          response => {
            console.log(`[INFO]: Response ${req.method} to ${req.url}`);
            res.end(response);
          },
          error => {
            console.log('[ERROR]: THEN ');
            Object.assign(res, { statusCode: error.status || 500 }).end(error.message || 'Error...');
          }
        )
        .catch(err => {
          res.statusCode = err.status;
          console.log(`[ERROR]: CATCH ${err.status} ${req.method} ${err.message}`);
          res.end(err.message);
        });
      },
      (err) => {
        console.log(`[ERROR]: SUBSCRIBE Server listening error:`, err);
        // TODO error handeling
      },
      () => console.log(`[INFO]: Stop listening server events request`, )
    );
  }

  private _bootstrap(): void {
    // bootstrap server
    this.server.listen(+this.port, this.host, () => {
      console.log(`[INFO]: NodeJS RxHttpServer starting at http://${this._host}:${this._port}`);
    });
    // listening request
    this._listenRequests();
  }

  get host(): string {
    return this._host;
  }

  get port(): number {
    return this._port;
  }
}

RxHttpServer.start().catch(err => console.log(err));