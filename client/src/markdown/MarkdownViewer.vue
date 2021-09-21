<template>
  <viewer :initialValue="value" />
</template>

<script>
import { Viewer } from "@toast-ui/vue-editor";
export default {
  components: {
    Viewer,
  },
  props: {
    value: String,
  },
};
</script>

<style></style>
