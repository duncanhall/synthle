
import WebSocket from 'ws';
import uuidV4 from 'uuid/v4';
import { GET_ROOM_INFO, ROOM_INFO } from '../assets/app/SynthleEvent';

class WsServer {

  constructor(server) {
    this.wss = new WebSocket.Server({ server });
    this.wss.on('connection', function connection(ws) {

      ws.on('message', function incoming(msg) {
        const event = JSON.parse(msg);
        switch(event.st) {
          case GET_ROOM_INFO:
            const id = uuidV4().substr(0, 7);
            const msg = { st:ROOM_INFO, sd:{id}};
            ws.send(JSON.stringify(msg));
            break;
        }
      });
    });
  }
}

export default WsServer
