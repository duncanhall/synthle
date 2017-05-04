<template>
  <div class="square">
      <div class="block">
        <nuxt-link to="/main" class="button">Start a room</nuxt-link>
      </div>
      <div class="block">
        <nuxt-link to="/controller" class="button">Controller</nuxt-link>
      </div>
  </div>
</template>

<script>
export default {
  head () {
    const title = 'Synthle';
    return { title };
  }
}
</script>

<style>
  .square {
    background: #ACACAC;
    width: 80vw;
    height: 80vw;
    margin-top: 20vw;
    margin-left: 10vw;
    padding-top: 50px;
    border: 1px solid #999999;
    border-radius: 4px;
    text-align: center;
  }
  .square h1 {
    color: #fff;
  }

  .button {
    width: 90%;
  }
</style>
