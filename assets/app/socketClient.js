
import SynthlePubSub from './messaging/SynthlePubSub'
import SynthleEvent from './messaging/SynthleEvent';
import { REGISTERED } from './messaging/SynthleEventType';

class SocketClient extends SynthlePubSub {
  constructor() {
    super();
  }

  get isConnected() {
    if (this.socket === undefined) {
      return false;
    }
    const readyState = this.socket.readyState;
    return readyState === WebSocket.OPEN || readyState === WebSocket.CONNECTING;
  }

  connect(registration) {
    return new Promise(resolve => {
      this.socket = new WebSocket('ws://192.168.0.14:2222');
      this.socket.onopen = () => {
        // Resolve the promise once connected and registered
        this.socket.onmessage = message => {
          const event = SynthleEvent.fromMessage(message);
          if (event.type === REGISTERED) {
            this.socket.onmessage = msg => this._publish(msg);
            this.socket.onerror = error => this._onError(error);
            this.socket.onclose = event => this._onClose(event);
            resolve();
          }
        };
        this.send(registration);
      };
    });
  }

  send(type, data) {
    const event = new SynthleEvent(type, data)
    this.socket.send(event);
  }

  _onError(event) {
    console.error(`ERROR: ${event.data}`);
  }

  _onClose(event) {
    console.log(`CLOSE: ${event.data}`);
    this.unsubscribeAll();
  }
}

export default SocketClient

