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
  name: "app"
};
</script>

<style>
</style>
