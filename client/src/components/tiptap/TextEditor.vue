<template>
  <v-card outlined>
    <editor-content class="text-editor-card" :editor="editor" />
  </v-card>
</template>
<script>
import TipTapBaseVue from "./TipTapBase.vue";
export default {
  extends: TipTapBaseVue,
  data() {
    return {
      editable: true,
    };
  },
};
</script>
<style scoped>
.text-editor-card >>> .ProseMirror {
  outline: none !important;
  cursor: text;
  margin: 0;
  padding: 32px 16px;
}
</style>
