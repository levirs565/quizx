<template>
  <v-main>
    <slot v-if="state && !state.isLoading && !state.isError" />
    <molecule-error-view
      @reload="$emit('reload')"
      v-if="state && state.isError"
    />
  </v-main>
</template>
<script>
import MoleculeErrorView from "@/components/MoleculeErrorView.vue";

export default {
  components: {
    MoleculeErrorView,
  },
  props: {
    state: {
      type: Object,
    },
  },
};
</script>
