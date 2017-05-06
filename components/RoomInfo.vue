<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          {{ roomInfo }}
        </h1>
      </div>
    </div>
  </section>
</template>

<script>
import SocketClient from '~assets/app/socketClient';
import { GET_ROOM_INFO, ROOM_INFO } from '~assets/app/SynthleEvent';

export default {  
  mounted () {
    this.client = new SocketClient();
    this.client.subscribe(ROOM_INFO, this.onRoomInfo);
    this.getRoomInfo();
  },

  data() {
    return {
      roomInfo: 'Getting room info...'
    }
  },

  methods: {
    async getRoomInfo() {
      await this.client.connect();
      this.client.send(GET_ROOM_INFO);
    },

    onRoomInfo (data) {
      console.log('GOT ROOM INFO:');
      console.dir(data);
      this.roomInfo = data.id
    }
  }
}

</script>
