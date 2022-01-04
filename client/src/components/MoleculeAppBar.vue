<template>
  <v-app-bar app color="white">
    <slot />
    <v-progress-linear
      :active="isLoading"
      :indeterminate="isLoading"
      absolute
      bottom
    ></v-progress-linear>
  </v-app-bar>
</template>
<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
