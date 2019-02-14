import { Subject } from "rxjs";
import { distinct, distinctUntilChanged, map, debounceTime } from 'rxjs/operators';

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
        stream.next(message.data);
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

    return stream.pipe(
      distinctUntilChanged(),
      debounceTime(10), // avoids overprocessing
      map((textData: string) => {
        try {
          const parsedData = JSON.parse(textData);
          return parsedData;
        } catch (error) {
          return textData;
        }
      })
    );

  }

}
