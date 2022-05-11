<template>
  <v-main>
    <slot v-if="state && !state.isLoading && !state.isError" />
    <resource-error-view
      @reload="$emit('reload')"
      v-if="state && state.isError"
    />
  </v-main>
</template>
<script>
import ResourceErrorView from "@/components/resource/ResourceErrorView.vue";

export default {
  components: {
    ResourceErrorView,
  },
  props: {
    state: {
      type: Object,
    },
  },
};
</script>
