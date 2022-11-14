<template>
  <div>
    <base-app-bar :isLoading="state && state.isLoading">
      <slot name="toolbar" />
      <template #append>
        <slot name="toolbarAppend" />
      </template>
    </base-app-bar>
    <resource-main-container @reload="$emit('reload')" :state="state">
      <v-container>
        <slot />
      </v-container>
    </resource-main-container>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import BaseAppBar from "@/components/BaseAppBar.vue";
import ResourceMainContainer from "./ResourceMainContainer.vue";

export interface ResourceState {
  isLoading: Boolean;
  isError: Boolean;
}

export function createResourceState(
  isLoading: Boolean,
  isError: Boolean
): ResourceState {
  return {
    isLoading,
    isError,
  };
}

export function updateResourceStateByPromise<T>(
  promise: Promise<T>,
  updater: (state: ResourceState) => void // eslint-disable-line
) {
  updater(createResourceState(true, false));
  promise
    .then((val) => {
      updater(createResourceState(false, false));
      return val;
    })
    .catch(() => {
      updater(createResourceState(false, true));
    });
}

export default defineComponent({
  components: {
    BaseAppBar,
    ResourceMainContainer,
  },
  props: {
    state: {
      type: Object,
    },
  },
});
</script>
