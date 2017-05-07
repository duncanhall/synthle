<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="square">
          <div class="field" >
            <p class="control">
              <input v-model="roomID" :disabled="isConnecting" class="input" type="text" placeholder="Room ID" />
            </p>
            <div v-on:click="joinRoom" v-bind:class="{ 'is-loading': isConnecting }" :disable="isConnecting" class="button">Join</div>
          </div>
          <p v-if="roomNotFound" class="has-text-centered">
            Room not found
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import SocketClient from '~assets/app/socketClient';
  import { REGISTER_CONTROLLER, JOIN_ROOM, ROOM_NOT_FOUND, CONTROLLER_JOINED } from '~assets/app/messaging/SynthleEventType';

  export default {
    mounted() {
      this.client = new SocketClient();
      this.client.subscribe(ROOM_NOT_FOUND, this.onRoomNotFound);
      this.client.subscribe(CONTROLLER_JOINED, this.onJoinRoom);
      this.connect();
    },
    
    data() {
      return {
        roomID: null,
        isConnecting: false,
        roomNotFound: false
      }
    },

    methods: {
      async connect() {
        await this.client.connect(REGISTER_CONTROLLER);
      },
      
      joinRoom () {
        this.isConnecting = true;
        this.roomNotFound = false;
        this.client.send(JOIN_ROOM, { id:this.roomID });
      },

      onJoinRoom() {
        this.isConnecting = false;
        this.$router.push('controller');
      },

      onRoomNotFound() {
        this.isConnecting = false;
        this.roomNotFound = true;
      }
    }
  }
</script>

<style>
.square {
  background: #ACACAC;
  padding-top: 50px;
  padding-bottom: 50px;
  border: 1px solid #999999;
  border-radius: 4px;
}

.button, .input {
  width: 90%;
  margin-left: 5%;
}
</style>
