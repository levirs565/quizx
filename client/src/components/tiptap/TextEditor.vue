<template>
  <v-card outlined>
    <editor-content class="text-editor-card" :editor="editor" />
  </v-card>
</template>
<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
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
    modelValue: String,
    hasMenu: {
      type: Boolean,
      default: false,
    },
    selectImageFunction: Function,
    mathVirtualKeyboardContainer: HTMLElement,
  },
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      let editorClass = "text-body-1 text--primary";
      const mathNodeSetting = {
        addOptions: () => {
          return {
            virtualKeyboardContainer: this.mathVirtualKeyboardContainer
              ? this.mathVirtualKeyboardContainer
              : document.body,
          };
        },
      };
      this.editor = new Editor({
        editable: true,
        content: this.modelValue,
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
          MathBlock.extend(mathNodeSetting),
          MathInline.extend(mathNodeSetting),
        ],
        editorProps: {
          attributes: {
            class: editorClass,
          },
        },
        onUpdate: () => {
          this.$emit("update:modelValue", this.editor.getHTML());
        },
        onFocus: ({ editor }) => {
          this.$emit("editorFocus", editor);
        },
        onBlur: ({ editor, event }) => {
          this.$emit("editorBlur", editor, event);
        },
      });
    });
  },
  watch: {
    modelValue(value) {
      if (this.editor.getHTML() === value) return;
      this.editor.commands.setContent(value, false);
    },
  },
  beforeUnmount() {
    this.editor.destroy();
  },
  emits: ["update:modelValue", "editorFocus", "editorBlur"],
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
