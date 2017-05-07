<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container room-info">
        <h1 class="title">
          {{ roomInfo }}
        </h1>
      </div>
    </div>
  </section>
</template>

<script>
  import SocketClient from '~assets/app/socketClient';
  import { REGISTER_SYNTHLE, CREATE_ROOM, ROOM_CREATED, CONTROLLER_JOINED } from '~assets/app/messaging/SynthleEventType';

  export default {  
    mounted () {
      this.client = new SocketClient();
      this.client.subscribe(ROOM_CREATED, this.onRoomInfo);
      this.client.subscribe(CONTROLLER_JOINED, this.onControllerJoined);
      this.connect();
    },

    data() {
      return {
        roomInfo: 'Getting room info...'
      }
    },

    methods: {
      async connect() {
        await this.client.connect(REGISTER_SYNTHLE);
        this.client.send(CREATE_ROOM);
      },

      onRoomInfo (data) {
        this.roomInfo = data.id
      },

      onControllerJoined (data) {
        console.log('CONTROLLER JOINED ROOM!');
      }
    }
  }
</script>

<style>
  .room-info {
    text-align: center;
  }
</style>
