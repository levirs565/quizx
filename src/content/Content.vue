<template>
  <div class="flex flex-col">
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "./navigation/Navigation";

export default {
  components: {
    Navigation
  }
};
</script>

<style>
</style>
