<template>
  <div>
    <section v-if="isConnected" class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <join-dialog v-if="isController" />
          <room-info v-if="!isController" />
        </div>
      </div>
    </section>
    <loader v-if="!isConnected" />
  </div>
</template>

<script>
  import Loader from '~components/common/Loading'
  import JoinDialog from '~components/controller/JoinDialog'
  import RoomInfo from '~components/synthle/RoomInfo'
  import * as Synthle from '~assets/app/messaging/SynthleEventType';

  export default {
    head () {
      const title = 'Synthle';
      return { title };
    },

    data () {
      return {
        isConnected: false,
        isController: false
      }
    },

    mounted () {
      this.isController = this.getTouchCapability();
      this.client = this.getSynthleConnection();
      this.client.subscribe(Synthle.CONTROLLER_JOINED, this.onPairingComplete);
      this.connect();
    },

    methods: {  
      async connect() {
        const DEVICE = this.isController ? Synthle.REGISTER_CONTROLLER : Synthle.REGISTER_SYNTHLE;
        await this.client.connect(DEVICE);
        this.isConnected = true;
      },

      onPairingComplete() {
        const DEVICE_PAGE = this.isController ? 'controller' : 'synthle';
        this.$router.push(DEVICE_PAGE);
      },

      getTouchCapability() {
        if (this.$route.query.forceController === 'true') {
          return true;
        } else {
          return 'ontouchstart' in window ||
            window.DocumentTouch && document instanceof window.DocumentTouch ||
            navigator.maxTouchPoints > 0 ||
            window.navigator.msMaxTouchPoints > 0;
        }
      }
    },

    beforeDestroy() {
      this.client.unsubscribe(Synthle.CONTROLLER_JOINED, this.onPairingComplete);
    },

    components: {
      Loader,
      JoinDialog,
      RoomInfo
    }
  }
</script>

