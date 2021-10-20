<template>
  <editor-content :editor="editor" />
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import { MathBlock, MathInline } from "./extensions/Math";
import { CursorTracker } from "./extensions/CursorTracker";

export default {
  components: {
    EditorContent,
  },
  props: {
    value: String,
    editable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    let editorClass = "content";
    if (this.editable) {
      editorClass += " textarea";
    }
    this.editor = new Editor({
      editable: this.editable,
      content: this.value,
      extensions: [StarterKit, CursorTracker, MathBlock, MathInline],
      editorProps: {
        attributes: {
          class: editorClass,
        },
      },
      onUpdate: () => {
        this.$emit("input", this.editor.getHTML());
      },
    });
  },

  before() {
    this.editor.destroy();
  },
};
</script>

<style>
.ProseMirror.textarea {
  height: auto !important;
  max-height: 100% !important;
}
</style>
