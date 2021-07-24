<template>
  <div class="flex flex-col">
    <modal></modal>
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "./navigation/Navigation";
import Modal from "./modal/Modal";

export default {
  components: {
    Navigation,
    Modal
  }
};
</script>

<style>
</style>
