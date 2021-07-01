<template>
  <router-view class="bg-gray-100 h-screen"></router-view>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("updateUser");
  }
};
</script>

<style>
@import "style.css";
</style>
