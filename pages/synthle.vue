<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <span class="icon" style="height: 9rem; width: 9rem;">
          <i v-if="!isPressed" class="fa fa-circle-o" style="font-size: 126px;"></i>
          <i v-if="isPressed" class="fa fa-circle" style="font-size: 126px;"></i>
        </span>
      </div>
    </div>
  </section>
</template>

<script>
  import { RELAY } from '~assets/app/messaging/SynthleEventType';
  
  export default {
    mounted() {
      this.client = this.getSynthleConnection();
      this.client.subscribe(RELAY, this.onControllerEvent);
    },

    data() {
      return {
        isPressed: false
      }
    },

    methods: {
      onControllerEvent(event) {
        this.isPressed = event.isPressed;
      }
    }
  }
</script>
