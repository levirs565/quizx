<template>
  <div>
    <text-editor-menu
      :editor="editor"
      :selectImageFunction="selectImageFunction"
      v-if="hasMenu"
    />
    <text-editor-bubble-menu :editor="editor" v-if="hasMenu" />
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import ExtendedTable from "./extensions/ExtendedTable";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";
import { MathBlock, MathInline } from "./extensions/Math";
import { CursorTracker } from "./extensions/CursorTracker";
import TextEditorMenu from "./TextEditorMenu.vue";
import TextEditorBubbleMenu from "./TextEditorBubbleMenu.vue";

export default {
  components: {
    EditorContent,
    TextEditorMenu,
    TextEditorBubbleMenu,
  },
  props: {
    value: String,
    editable: {
      type: Boolean,
      default: true,
    },
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
      editable: this.editable,
      content: this.value,
      extensions: [
        StarterKit,
        ExtendedTable,
        TableRow,
        TableHeader,
        TableCell,
        Image,
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
    });
  },
  watch: {
    value(value) {
      if (this.editor.getHTML() === value) return;
      this.editor.commands.setContent(value, false);
    },
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
