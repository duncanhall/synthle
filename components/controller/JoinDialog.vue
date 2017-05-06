<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="square">
          <p class="control">
            <input v-model="roomID" class="input" type="text" placeholder="Room ID">
          </p>
          <div v-on:click="joinRoom" class="button">Join</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      roomID: null
    }
  },

  methods: {
    joinRoom () {
      console.log('join room')
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
