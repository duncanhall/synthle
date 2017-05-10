<template>
  <section class="hero is-fullheight" style="background-color: rgb(22,22,22)">
    <div class="hero-body">
      <div class="container has-text-centered">
        <span ref="placeholder">
        </span>
      </div>
    </div>
  </section>
</template>

<script>
  import { RELAY } from '~assets/app/messaging/SynthleEventType';
  import CircleThing from '~assets/app/visuals/Circle';

  export default {
    mounted() {
      this.client = this.getSynthleConnection();
      this.client.subscribe(RELAY, this.onControllerEvent.bind(this));
      this.circle = new CircleThing();
      this.circle.start(this.$refs.placeholder);
    },

    methods: {
      onControllerEvent(event) {
        if (event.isPressed) {
          this.circle.grow();
        } else {
          this.circle.shrink();
        } 
      }
    }
  }
</script>
