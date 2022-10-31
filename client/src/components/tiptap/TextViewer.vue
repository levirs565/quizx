<template>
  <div class="TextViewer text-body-1 text--primary" v-html="value" />
</template>
<script>
import "./MathViewerElement";

export default {
  props: {
    value: String,
  },
};
</script>
