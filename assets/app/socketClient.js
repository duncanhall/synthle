
import SynthlePubSub from './messaging/SynthlePubSub'
import SynthleEvent from './messaging/SynthleEvent';

class SocketClient extends SynthlePubSub {
  constructor() {
    super();
  }

  connect() {
    return new Promise(resolve => {
      this.socket = new WebSocket('ws://192.168.0.14:2222');
      this.socket.onmessage = this._publish.bind(this);
      this.socket.onerror = this._onError.bind(this);
      this.socket.onclose = this._onClose.bind(this);
      this.socket.onopen = resolve;
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
  }
}


export default SocketClient
