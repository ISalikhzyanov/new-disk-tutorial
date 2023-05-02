<template>
  <div id="app">
    <navbar />
    <Main />
  </div>
</template>

<script>

import Navbar from "@/components/Navbar.vue";
import Main from "@/pages/Main.vue";


export default {
  name: 'App',
  components: {
    Main,
    Navbar
  }
}
</script>

<style lang="scss">
#app{
  max-width: 1920px;
}
</style>
