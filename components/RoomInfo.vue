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
  import { CREATE_ROOM, ROOM_CREATED } from '~assets/app/messaging/SynthleEventType';

  export default {  
    mounted () {
      this.client = new SocketClient();
      this.client.subscribe(ROOM_CREATED, this.onRoomInfo);
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
        this.client.send(CREATE_ROOM);
      },

      onRoomInfo (data) {
        this.roomInfo = data.id
      }
    }
  }
</script>
