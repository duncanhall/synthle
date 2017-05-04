<template>
  <div class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="block">
          <nuxt-link to="/main" class="button">Start a room</nuxt-link>
        </div>
        <div class="block">
          <nuxt-link to="/controller" class="button">Controller</nuxt-link>
        </div>
      </div>
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
