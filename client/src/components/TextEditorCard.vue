<template>
  <v-card outlined>
    <v-card-text>
      <text-editor
        class="text-editor-card"
        v-bind="$attrs"
        @input="$emit('input', $event)"
      />
    </v-card-text>
  </v-card>
</template>
<script>
import TextEditor from "./TextEditor.vue";
export default {
  components: { TextEditor },
};
</script>
<style scoped>
.text-editor-card >>> .ProseMirror {
  outline: none !important;
}
</style>
