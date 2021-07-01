<template>
  <router-link exact-active-class="selected" :to="to" tag="li">
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
