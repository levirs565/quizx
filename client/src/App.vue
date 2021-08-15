<template>
  <router-view></router-view>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("updateUser");
  },
};
</script>

<style>
@import "style.css";
</style>
