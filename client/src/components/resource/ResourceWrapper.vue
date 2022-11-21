<template>
  <div>
    <base-app-bar :isLoading="state && state.isLoading">
      <slot name="toolbar" />
      <template #append>
        <slot name="toolbarAppend" />
      </template>
    </base-app-bar>
    <resource-main-container @reload="emit('reload')" :state="state">
      <v-container>
        <slot />
      </v-container>
    </resource-main-container>
  </div>
</template>
<script lang="ts" setup>
import BaseAppBar from "@/components/BaseAppBar.vue";
import { ResourceState } from "./helper";
import ResourceMainContainer from "./ResourceMainContainer.vue";

export interface Props {
  state: ResourceState;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "reload"): void;
}>();
</script>
