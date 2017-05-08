<template>
  <div>
    <h1 class="title is-2">Connect your touch device to start</h1>
    <h1 class="title is-1">
      {{ roomInfo }}
    </h1>
  </div>
</template>

<script>
  import { CREATE_ROOM, ROOM_CREATED } from '~assets/app/messaging/SynthleEventType';

  export default {  
    mounted () {
      this.client = this.getSynthleConnection();
      this.client.subscribe(ROOM_CREATED, this.onRoomInfo);
      this.client.send(CREATE_ROOM);
    },

    data() {
      return {
        roomInfo: 'Getting room info...'
      }
    },

    methods: {
      onRoomInfo (data) {
        this.roomInfo = data.id
      }
    },
    
    beforeDestroy() {
      this.client.unsubscribe(ROOM_CREATED, this.onRoomInfo);
    },
  }
</script>

