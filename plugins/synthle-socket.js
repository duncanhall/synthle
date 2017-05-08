import Vue from 'vue';
import SocketClient from '~assets/app/socketClient';

class SynthleSocket {
  static install(Vue, options) {
    let client;
    Vue.prototype.getSynthleConnection = function() {
      if (client === undefined) {
        client = new SocketClient();
      }
      return client;
    }
  }
}

Vue.use(SynthleSocket);
