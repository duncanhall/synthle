<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <v-touch tag="span" v-bind:press-options="{time: 0}" v-on:press="onPress" v-on:pressup="onPressUp" class="icon" style="height: 6rem; width: 6rem;">
          <i v-if="!isPressed" class="fa fa-heart-o" style="font-size: 84px;"></i>
          <i v-if="isPressed" class="fa fa-heart" style="font-size: 84px;"></i>
        </v-touch>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
  
    data() {
      return {
        isPressed: false
      }
    },

    methods: {
      onPress() {
        this.isPressed = true;
      },
      
      onPressUp() {
        this.isPressed = false;
      },
    }
  }

</script>
