<template>
  <v-card outlined>
    <v-card-text>
      <editor-content class="text-editor-card" :editor="editor" />
    </v-card-text>
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
}
</style>
