
import WebSocket from 'ws';
import uuidV4 from 'uuid/v4';
import SynthleEvent from '../assets/app/messaging/SynthleEvent';
import SynthlePubSub from '../assets/app/messaging/SynthlePubSub';
import { CREATE_ROOM, ROOM_CREATED } from '../assets/app/messaging/SynthleEventType';

class WsServer {
  constructor(server) {
    this.wss = new WebSocket.Server({ server });
    this.wss.on('connection', ws => new WsConnection(ws));
  }
}

class WsConnection extends SynthlePubSub {
  constructor(socket) {
    super();
    this.socket = socket;
    this.socket.onmessage = this._publish.bind(this);
    this.subscribe(CREATE_ROOM, this._createRoom);
  }

  _createNewRoom() {
    const id = uuidV4().substr(0, 7);
    const response = new SynthleEvent(ROOM_CREATED, { id });
    this.socket.send(response.tx());
  }
}


export default WsServer
