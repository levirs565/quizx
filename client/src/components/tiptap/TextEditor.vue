<template>
  <v-card outlined>
    <editor-content class="text-editor-card" :editor="editor" />
  </v-card>
</template>
<script lang="ts" setup>
import { Editor, EditorContent, useEditor } from "@tiptap/vue-3";
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
import { watch } from "vue";

export interface Props {
  modelValue: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "editorFocus", editor: Editor): void;
  (e: "editorBlur", editor: Editor, event: FocusEvent): void;
}>();

const editorClass = "text-body-1 text--primary";
const editor = useEditor({
  editable: true,
  content: props.modelValue,
  extensions: [
    StarterKit,
    Table,
    TableRow,
    TableHeader,
    TableCell,
    Image.configure({
      inline: true,
    }),
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
    emit("update:modelValue", editor.value!.getHTML());
  },
  onFocus: ({ editor }) => {
    emit("editorFocus", editor as Editor);
  },
  onBlur: ({ editor, event }) => {
    emit("editorBlur", editor as Editor, event);
  },
  onSelectionUpdate: ({ editor: transaction }) => {
    // console.log("Selection update event");
  },
});

watch(
  () => props.modelValue,
  (value) => {
    if (editor.value!.getHTML() === value) return;
    editor.value!.commands.setContent(value, false);
  }
);
</script>
<style scoped>
.text-editor-card >>> .ProseMirror {
  outline: none !important;
  cursor: text;
  margin: 0;
  padding: 32px 16px;
}
</style>
