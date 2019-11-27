<template>
  <div class="flex flex-row">
    <navigation></navigation>
    <router-view class="m-8 h-auto w-auto flex-grow"></router-view>
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
