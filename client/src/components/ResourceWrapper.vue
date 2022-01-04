<template>
  <div>
    <molecule-app-bar :isLoading="state && state.isLoading">
      <slot name="toolbar" />
    </molecule-app-bar>
    <organism-resource-main @reload="$emit('reload')" :state="state">
      <v-container>
        <slot />
      </v-container>
    </organism-resource-main>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import MoleculeAppBar from "./MoleculeAppBar.vue";
import OrganismResourceMain from "./OrganismResourceMain.vue";

interface ResourceState {
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

export default Vue.extend({
  components: {
    MoleculeAppBar,
    OrganismResourceMain,
  },
  props: {
    state: {
      type: Object,
    },
  },
});
</script>
