<template>
  <router-link exact-active-class="selected" :to="to">
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
