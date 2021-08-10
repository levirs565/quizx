<template>
  <div class="flex flex-col">
    <modal></modal>
    <app-bar></app-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import AppBar from "./navigation/CAppBar.vue";
import Modal from "./modal/Modal";

export default {
  components: {
    AppBar,
    Modal,
  },
};
</script>

<style></style>
