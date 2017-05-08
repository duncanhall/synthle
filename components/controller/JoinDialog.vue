<template>
  <div class="join-dialog">
    <div class="field">
      <p class="control">
        <input v-model="roomID" :disabled="isConnecting" class="input" type="text" placeholder="Room ID" />
      </p>
      <div v-on:click="joinRoom" v-bind:class="{ 'is-loading': isConnecting }" :disable="isConnecting" class="button">Join</div>
    </div>
    <p v-if="roomNotFound" class="has-text-centered">
      Room not found
    </p>
  </div>
</template>

<script>
  import { JOIN_ROOM, ROOM_NOT_FOUND, CONTROLLER_JOINED } from '~assets/app/messaging/SynthleEventType';

  export default {
    mounted() {
      this.client = this.getSynthleConnection();
      this.client.subscribe(ROOM_NOT_FOUND, this.onRoomNotFound);
      this.client.subscribe(CONTROLLER_JOINED, this.onJoinRoom);
    },
    
    data() {
      return {
        roomID: null,
        isConnecting: false,
        roomNotFound: false
      }
    },

    methods: {
      joinRoom () {
        this.isConnecting = true;
        this.roomNotFound = false;
        this.client.send(JOIN_ROOM, { id:this.roomID });
      },

      onJoinRoom() {
        this.isConnecting = false;
      },

      onRoomNotFound() {
        this.isConnecting = false;
        this.roomNotFound = true;
      }
    },

    beforeDestroy() {
      this.client.unsubscribe(ROOM_NOT_FOUND, this.onRoomNotFound);
      this.client.unsubscribe(CONTROLLER_JOINED, this.onJoinRoom);
    },
  }
</script>

<style scoped>
  .join-dialog {
    background: #ACACAC;
    padding-top: 50px;
    padding-bottom: 50px;
    border: 1px solid #999999;
    border-radius: 4px;
  }

  .button, .input {
    width: 90%;
  }

  .input {
    margin-left: 5%;
  }
</style>
