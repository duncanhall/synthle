
import WebSocket from 'ws';
import uuidV4 from 'uuid/v4';
import SynthleEvent from '../assets/app/messaging/SynthleEvent';
import SynthlePubSub from '../assets/app/messaging/SynthlePubSub';
import * as EventType from '../assets/app/messaging/SynthleEventType';

class WsServer {
  constructor(server) {
    this.wss = new WebSocket.Server({ server, perMessageDeflate:false });
    this.wss.on('connection', this.onNewConnection.bind(this));
    this.sessions = new Map();
  }

  onNewConnection(ws) {
    ws.onmessage = function(msg) {
      const event = SynthleEvent.fromMessage(msg);
      switch(event.type) {

        case EventType.REGISTER_SYNTHLE:
          ws.onmessage = null;
          this.registerSynthle(ws);
          break;
        
        case EventType.REGISTER_CONTROLLER:
          ws.onmessage = null;
          this.registerController(ws);
          break;
      }
    }.bind(this);
  }

  registerSynthle(socket) {
    const id = uuidV4().substr(0, 7);
    this.sessions.set(id, new SynthleConnection(socket, id));
  }
  
  registerController(socket) {
    new ControllerConnection(socket, this.getSynthleConnection.bind(this));
  }

  getSynthleConnection(id) {
    return this.sessions.get(id);
  }
}

class SynthleConnection extends SynthlePubSub {
  constructor(socket, id) {
    super();
    this.socket = socket;
    this.id = id;
    this.socket.onmessage = this._publish.bind(this);
    this.subscribe(EventType.CREATE_ROOM, this._createNewRoom.bind(this));
    this.send(EventType.REGISTERED);
  }

  send(type, data) {
    const event = new SynthleEvent(type, data);
    this.socket.send(event.tx());
  }

  _createNewRoom() {
    this.send(EventType.ROOM_CREATED, { id:this.id });
  }
}

class ControllerConnection extends SynthlePubSub {
  constructor(socket, getSynthle) {
    super();
    this.socket = socket;
    this.getSynthle = getSynthle;
    this.socket.onmessage = this._publish.bind(this);
    this.subscribe(EventType.JOIN_ROOM, this._joinRoom.bind(this));
    this.send(EventType.REGISTERED);
  }

  send(type, data) {
    const event = new SynthleEvent(type, data);
    this.socket.send(event.tx());
  }

  _joinRoom(data) {
    console.log('JOIN ROOM: ' + data.id);
    this.synthle = this.getSynthle(data.id);
    this._sendToSynthle(EventType.CONTROLLER_JOINED);
  }

  _sendToSynthle(type, data) {
    this.synthle.send(type, data);
  }
}

export default WsServer

