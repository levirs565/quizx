<template>
  <div id="app" class="flex flex-col h-screen">
    <notification-container ref="nof"></notification-container>
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import NotificationContainer from "./components/NotificationContainer.vue";
import Navigation from "./components/Navigation";

export default {
  components: {
    NotificationContainer,
    Navigation
  },
  name: "app",
  mounted() {
    this.notification.container = this.$refs.nof;
  }
};
</script>

<style>
</style>
