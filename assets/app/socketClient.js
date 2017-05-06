'use strict';

class SocketClient {

  constructor() {
    this.subscribers = {};
  }

  connect() {
    return new Promise(resolve => {
      this.socket = new WebSocket('ws://192.168.0.14:2222');
      this.socket.onmessage = this._onMessage.bind(this);
      this.socket.onerror = this._onError.bind(this);
      this.socket.onclose = this._onClose.bind(this);
      this.socket.onopen = function(data) {
        resolve(data);
      }
    });
  }

  send(type, data) {
    data = data || {};
    const msg = { st:type, sd:data };
    this.socket.send(JSON.stringify(msg));
  }

  subscribe(eventType, handler) {
    let subs = this.subscribers[eventType] || [];
    subs.push(handler);
    this.subscribers[eventType] = subs;
  }

  _onMessage(event) {
    const synthle = JSON.parse(event.data);
    const type = synthle.st;
    const data = synthle.sd;
    const subs = this.subscribers[type];
    if (subs !== undefined) {
      subs.forEach((sub) => sub(data));
    }
  }

  _onError(event) {
    console.error(`ERROR: ${event.data}`);
  }

  _onClose(event) {
    console.log(`CLOSE: ${event.data}`);
  }
}


export default SocketClient
