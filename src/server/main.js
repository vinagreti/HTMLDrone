"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_ws_1 = __importDefault(require("express-ws"));
const routes_1 = require("./routes");
const environments_1 = require("./environments/environments");
const ws_routes_1 = require("./ws-routes");
class MainServer {
    get app() { return this._app; }
    get port() { return this._port; }
    get server() { return this._server; }
    get routes() { return this._routes; }
    get webSocket() { return this._webSocket; }
    get webSocketRoutes() { return this._webSocketRoutes; }
    constructor() {
        this.createApp();
        this.initWebsocket();
        this.registerRoutes();
        this.initServer();
        this.detectRunningPort();
    }
    createApp() {
        this._app = express_1.default();
    }
    initWebsocket() {
        this._webSocket = express_ws_1.default(this.app);
    }
    registerRoutes() {
        this._routes = new routes_1.MainRoutes(this.app);
        this._webSocketRoutes = new ws_routes_1.WsRoutes(this.webSocket);
    }
    initServer() {
        this._server = this.app.listen(environments_1.environment.port, () => {
            this.logServerStatus();
        });
    }
    detectRunningPort() {
        const address = this.server.address();
        this._port = address.port;
    }
    logServerStatus() {
        console.log(`Example app listening on ${environments_1.environment.name} env at port ${this.port}`);
    }
}
exports.MainServer = MainServer;
//# sourceMappingURL=main.js.map