<template>
  <editor-content :editor="editor" />
</template>
<script>
import TipTapBaseVue from "./TipTapBase.vue";
export default {
  extends: TipTapBaseVue,
  data() {
    return {
      editable: false,
    };
  },
};
</script>
