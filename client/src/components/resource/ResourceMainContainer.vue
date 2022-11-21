<template>
  <v-main>
    <slot v-if="state && !state.isLoading && !state.isError" />
    <resource-error-view
      @reload="$emit('reload')"
      v-if="state && state.isError"
    />
  </v-main>
</template>
<script lang="ts" setup>
import ResourceErrorView from "@/components/resource/ResourceErrorView.vue";
import { ResourceState } from "./ResourceWrapper.vue";

export interface Props {
  state: ResourceState;
}

const props = defineProps<Props>();
</script>
