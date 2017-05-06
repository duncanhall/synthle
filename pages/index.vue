<template>
  <div>
    <loader v-if="!deviceDetected" />
    <join-dialog v-if="deviceDetected && touchCapable" />
    <room-info v-if="deviceDetected && !touchCapable" />
  </div>
</template>

<script>
import Loader from '~components/common/Loading'
import JoinDialog from '~components/controller/JoinDialog'
import RoomInfo from '~components/RoomInfo'

export default {
  head () {
    const title = 'Synthle';
    return { title };
  },

  data () {
    return {
      deviceDetected: false,
      touchCapable: false
    }
  },

  mounted () {
    this.touchCapable = 'ontouchstart' in window ||
      window.DocumentTouch && document instanceof window.DocumentTouch ||
      navigator.maxTouchPoints > 0 ||
      window.navigator.msMaxTouchPoints > 0;

    this.deviceDetected = true;
  },

  components: {
    Loader,
    JoinDialog,
    RoomInfo
  }
}
</script>
