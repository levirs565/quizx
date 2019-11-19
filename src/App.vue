<template>
  <div id="app" class="flex flex-col h-screen">
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "./components/Navigation";

export default {
  components: {
    Navigation
  },
  mounted() {
    this.$store.dispatch("updateLogin");
  },
  name: "app"
};
</script>

<style>
</style>
