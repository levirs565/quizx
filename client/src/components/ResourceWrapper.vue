<template>
  <div>
    <v-app-bar app color="white">
      <slot name="toolbar" />
      <v-progress-linear
        :active="state && state.isLoading"
        :indeterminate="state && state.isLoading"
        absolute
        bottom
      ></v-progress-linear>
    </v-app-bar>
    <v-main>
      <v-container v-if="state && !state.isLoading && !state.isError">
        <slot />
      </v-container>
      <v-container
        class="text-center"
        fill-height
        v-if="state && state.isError"
      >
        <v-row align-content="center" justify="center">
          <v-col cols="12">
            <h1 class="red--text text-h1">Oops!</h1>
          </v-col>
          <v-col cols="12">
            <h2 class="subtitle">An error occured</h2>
          </v-col>
          <v-col>
            <v-btn color="primary" @click="$emit('reload')">Reload</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
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
