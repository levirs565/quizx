<template>
  <div v-if="state">
    <b-loading :active="state.isLoading" :is-full-page="false" />
    <slot v-if="!state.isLoading && !state.isError" />
    <div class="section is-medium has-text-centered" v-if="state.isError">
      <h1 class="title has-text-danger-dark">Oops!</h1>
      <h2 class="subtitle">An error occured</h2>
      <b-button type="is-primary" @click="$emit('reload')">Reload</b-button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

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
  props: {
    state: {
      type: Object,
    },
  },
});
</script>
