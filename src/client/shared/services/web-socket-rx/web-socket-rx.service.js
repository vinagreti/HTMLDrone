"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const reconnectionTimeout = 30e3;
class WebSocketService {
    constructor() {
        console.log('WebSocketService:: STARTED');
    }
    connect(url = '', stream = new rxjs_1.Subject()) {
        const newWsConnection = new WebSocket(url);
        newWsConnection.onopen = (w) => {
            newWsConnection.onmessage = (message) => {
                try {
                    const parsedData = JSON.parse(message.data);
                    stream.next(parsedData);
                }
                catch (error) {
                    stream.next(message);
                }
            };
            newWsConnection.onerror = (message) => {
                setTimeout(() => {
                    this.connect(url, stream);
                }, reconnectionTimeout);
                console.log(`WebSocketService:: Connection ERROR (url) ${url} message: `, message);
            };
            newWsConnection.onclose = (message) => {
                setTimeout(() => {
                    this.connect(url, stream);
                }, reconnectionTimeout);
                console.log(`WebSocketService:: Connection CLOSED (url) ${url} message: `, message);
            };
        };
        return stream;
    }
}
exports.WebSocketService = WebSocketService;
//# sourceMappingURL=web-socket-rx.service.js.map