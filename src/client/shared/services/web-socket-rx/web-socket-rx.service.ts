import { Subject } from "rxjs";

const reconnectionTimeout = 30e3;

export class WebSocketService {

  constructor() {
    console.log('WebSocketService:: STARTED');
  }

  connect(
    url = '',
    stream = new Subject<any>()
  ) {
    const newWsConnection = new WebSocket(url);

    newWsConnection.onopen = (w) => {

      newWsConnection.onmessage = (message) => {
        try {
          const parsedData = JSON.parse(message.data);
          stream.next(parsedData);
        } catch (error) {
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
