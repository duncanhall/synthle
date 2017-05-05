<template>
  <div>
    <loader v-if="detectingDevice" />
    <join-dialog v-if="!detectingDevice && touchCapable" />
    <room-info v-if="!detectingDevice && !touchCapable" />
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
      detectingDevice: true,
      touchCapable: false
    }
  },

  mounted () {
    this.touchCapable = 'ontouchstart' in window ||
      window.DocumentTouch && document instanceof window.DocumentTouch ||
      navigator.maxTouchPoints > 0 ||
      window.navigator.msMaxTouchPoints > 0;

    this.detectingDevice = false;
  },

  components: {
    Loader,
    JoinDialog,
    RoomInfo
  }
}
</script>
