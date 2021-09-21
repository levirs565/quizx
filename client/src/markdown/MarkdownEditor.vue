<template>
  <editor
    class="block"
    ref="editor"
    :initialValue="value"
    initialEditType="wysiwyg"
    @change="onEditorChange($event)"
  ></editor>
</template>

<script>
import { Editor } from "@toast-ui/vue-editor";

export default {
  components: {
    Editor
  },
  props: {
    value: String,
  },
  methods: {
    onEditorChange() {
      this.$emit("input", this.$refs.editor.invoke("getMarkdown"));
    },
  },
};
</script>

<style></style>
