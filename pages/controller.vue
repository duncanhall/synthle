<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <v-touch tag="span" 
          v-bind:press-options="{time: 0, threshold:50}" 
          v-on:press="onPress" 
          v-on:pressup="onPressUp" 
          class="icon" 
          style="height: 18rem; width: 18rem;">
          <i v-if="!isPressed" class="fa fa-circle-o" style="font-size: 252px;"></i>
          <i v-if="isPressed" class="fa fa-circle" style="font-size: 252px;"></i>
        </v-touch>
      </div>
    </div>
  </section>
</template>

<script>
  import { RELAY } from '~assets/app/messaging/SynthleEventType';

  export default {
    mounted() {
      this.client = this.getSynthleConnection();
    },   
    
    data() {
      return {
        isPressed: false
      }
    },

    methods: {
      onPress() {
        this.isPressed = true;
        this.client.send(RELAY, { isPressed:true });
      },
      
      onPressUp() {
        this.isPressed = false;
        this.client.send(RELAY, { isPressed:false });
      }
    }
  }
</script>
