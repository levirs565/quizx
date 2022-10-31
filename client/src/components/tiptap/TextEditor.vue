<template>
  <v-card outlined>
    <editor-content class="text-editor-card" :editor="editor" />
  </v-card>
</template>
<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import { MathBlock, MathInline } from "./extensions/Math";
import { CursorTracker } from "./extensions/CursorTracker";

export default {
  components: {
    EditorContent,
  },
  props: {
    value: String,
    hasMenu: {
      type: Boolean,
      default: false,
    },
    selectImageFunction: Function,
  },
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    let editorClass = "text-body-1 text--primary";
    this.editor = new Editor({
      editable: true,
      content: this.value,
      extensions: [
        StarterKit,
        Table,
        TableRow,
        TableHeader,
        TableCell,
        Image,
        Superscript,
        Subscript,
        CursorTracker,
        MathBlock,
        MathInline,
      ],
      editorProps: {
        attributes: {
          class: editorClass,
        },
      },
      onUpdate: () => {
        this.$emit("input", this.editor.getHTML());
      },
      onFocus: ({ editor }) => {
        this.$emit("editorFocus", editor);
      },
      onBlur: ({ editor, event }) => {
        this.$emit("editorBlur", editor, event);
      },
    });
  },
  watch: {
    value(value) {
      if (this.editor.getHTML() === value) return;
      this.editor.commands.setContent(value, false);
    },
  },
  beforeDestroy() {
    this.editor.destroy();
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
