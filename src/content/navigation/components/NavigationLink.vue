<template>
  <router-link :class="{
      selected: $route.path == to
    }" :to="to">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    to: String
  }
};
</script>

<style>
</style>
