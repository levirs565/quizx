<template>
  <div id="app" class="flex flex-col h-full absolute w-full">
    <notification-container ref="nof"></notification-container>
    <navigation></navigation>
    <div class="flex flex-grow">
      <router-view></router-view>
    </div>
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
