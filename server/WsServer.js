
import WebSocket from 'ws';
import uuidV4 from 'uuid/v4';
import SynthleEvent from '../assets/app/messaging/SynthleEvent';
import SynthlePubSub from '../assets/app/messaging/SynthlePubSub';
import * as EventType from '../assets/app/messaging/SynthleEventType';

class WsServer {
  constructor(server) {
    this.wss = new WebSocket.Server({ server, perMessageDeflate:false });
    this.wss.on('connection', ws => this.onNewConnection(ws));
    this.sessions = new Map();
  }

  onNewConnection(ws) {
    ws.onmessage = msg => this.onMessage(ws, msg);
  }

  onMessage(ws, msg) {
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
  }

  registerSynthle(socket) {
    const id = uuidV4().substr(0, 7);
    this.sessions.set(id, new SynthleConnection(socket, id));
  }
  
  registerController(socket) {
    new ControllerConnection(socket, id => this.getSynthleConnection(id));
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
    this.subscribe(EventType.RELAY, this._sendToSynthle.bind(this, EventType.RELAY));
    this.send(EventType.REGISTERED);
  }

  send(type, data) {
    const event = new SynthleEvent(type, data);
    this.socket.send(event.tx());
  }

  _joinRoom(data) {
    const synthle = this.getSynthle(data.id);
    if (synthle === undefined) {
      this.send(EventType.ROOM_NOT_FOUND);
    } else {
      this.synthle = synthle;
      this._sendToSynthle(EventType.CONTROLLER_JOINED);
      this.send(EventType.CONTROLLER_JOINED);
    }
  }

  _relay(data) {
    this._sendToSynthle(EventType.RELAY, data);
  }

  _sendToSynthle(type, data) {
    this.synthle.send(type, data);
  }
}

export default WsServer

