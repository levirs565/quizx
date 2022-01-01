<template>
  <transition mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("updateUser");
  },
};
</script>

<style>
/* @import "style.css"; */
</style>
