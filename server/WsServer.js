
import WebSocket from 'ws';
import uuidV4 from 'uuid/v4';
import SynthleEvent from '../assets/app/messaging/SynthleEvent';
import SynthlePubSub from '../assets/app/messaging/SynthlePubSub';
import { REGISTER_SYNTHLE, REGISTER_CONTROLLER, REGISTERED, CREATE_ROOM, ROOM_CREATED } from '../assets/app/messaging/SynthleEventType';

class WsServer {
  constructor(server) {
    this.wss = new WebSocket.Server({ server });
    this.wss.on('connection', function connected(ws) {
      ws.onmessage = function(msg) {
        const event = SynthleEvent.fromMessage(msg);
        switch(event.type) {
          case REGISTER_SYNTHLE:
            ws.onmessage = null;
            new SynthleConnection(ws);
            break;
        }
      };
    
    }.bind(this));
  }
}

class SynthleConnection extends SynthlePubSub {
  constructor(socket) {
    super();
    this.socket = socket;
    this.socket.onmessage = this._publish.bind(this);
    this.subscribe(CREATE_ROOM, this._createNewRoom.bind(this));
    this.send(REGISTERED);
  }

  send(type, data) {
    const event = new SynthleEvent(type, data);
    this.socket.send(event.tx());
  }

  _createNewRoom() {
    const id = uuidV4().substr(0, 7);
    this.send(ROOM_CREATED, { id });
  }
}

export default WsServer

