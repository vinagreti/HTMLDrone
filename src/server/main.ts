import express from 'express';
import expressWs from 'express-ws';
import core from 'express-serve-static-core';

import { Server } from 'http';
import { AddressInfo } from 'net';
import { MainRoutes } from './routes';
import { environment } from './environments/environments';
import { WsRoutes } from './ws-routes';

export class MainServer {

  get app() { return this._app; }

  get port() { return this._port; }

  get server() { return this._server; }

  get routes() { return this._routes; }

  get webSocket() { return this._webSocket; }

  get webSocketRoutes() { return this._webSocketRoutes; }

  private _app!: core.Express;

  private _port!: number;

  private _server!: Server;

  private _routes!: MainRoutes;

  private _webSocket!: expressWs.Instance;

  private _webSocketRoutes!: WsRoutes;

  constructor() {
    this.createApp();
    this.initWebsocket();
    this.registerRoutes();
    this.initServer();
    this.detectRunningPort();
  }

  private createApp() {
    this._app = express();
  }

  private initWebsocket() {
    this._webSocket = expressWs(this.app);
  }

  private registerRoutes() {
    this._routes = new MainRoutes(this.app);
    this._webSocketRoutes = new WsRoutes(this.webSocket);
  }

  private initServer() {
    this._server = this.app.listen(environment.port, () => {
      this.logServerStatus();
    });
  }

  private detectRunningPort() {
    const address: AddressInfo = this.server.address() as AddressInfo;
    this._port = address.port;
  }

  private logServerStatus() {
    console.log(`Server listening on ${environment.name} env at port ${this.port}`);
  }

}
