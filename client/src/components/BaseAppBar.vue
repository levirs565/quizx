<template>
  <v-app-bar app color="white">
    <slot />
    <v-progress-linear
      :active="isLoading"
      :indeterminate="isLoading"
      v-show="isLoading"
      absolute
      bottom
    ></v-progress-linear>

    <template v-slot:append>
      <slot name="append" />
    </template>
  </v-app-bar>
</template>
<script lang="ts" setup>
export interface Props {
  isLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
});
</script>
