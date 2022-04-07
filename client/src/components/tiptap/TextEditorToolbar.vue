<template>
  <v-sheet
    :elevation="1"
    v-if="editor"
    class="my-4 text-editor-toolbar"
    :style="{ top: stickyTop }"
  >
    <action-button
      icon="mdi-table-plus"
      title="Add Table"
      @click="
        editor
          .chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run()
      "
    />
    <action-button
      icon="mdi-image-plus"
      title="Add Image"
      @click="$emit('addImage')"
    />
    <action-button
      icon="mdi-math-integral"
      title="Add Inline Math"
      @click="editor.chain().focus().addMathInline().run()"
    />
    <action-button
      icon="mdi-math-integral-box"
      title="Add Block Math"
      @click="editor.chain().focus().addMathBlock().run()"
    />
    <action-button
      icon="mdi-format-header-1"
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      :active="editor.isActive('heading', { level: 1 })"
      title="Heading 1"
    />
    <action-button
      icon="mdi-format-header-2"
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      :active="editor.isActive('heading', { level: 2 })"
      title="Heading 2"
    />
    <action-button
      icon="mdi-format-header-3"
      @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      :active="editor.isActive('heading', { level: 3 })"
      title="Heading 3"
    />
    <action-button
      icon="mdi-format-header-4"
      @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
      :active="editor.isActive('heading', { level: 4 })"
      title="Heading 4"
    />
    <action-button
      icon="mdi-format-header-5"
      @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
      :active="editor.isActive('heading', { level: 5 })"
      title="Heading 5"
    />
    <action-button
      icon="mdi-format-header-6"
      @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
      :active="editor.isActive('heading', { level: 6 })"
      title="Heading 6"
    />
    <action-button
      icon="mdi-format-paragraph"
      @click="editor.chain().focus().setParagraph().run()"
      :active="editor.isActive('paragraph')"
      title="Paragraph"
    />
    <action-button
      icon="mdi-format-list-bulleted"
      @click="editor.chain().focus().toggleBulletList().run()"
      :active="editor.isActive('bulletList')"
      title="Bullet List"
    />
    <action-button
      icon="mdi-format-list-numbered"
      @click="editor.chain().focus().toggleOrderedList().run()"
      :active="editor.isActive('orderedList')"
      title="Ordered List"
    />
    <action-button
      icon="mdi-code-not-equal-variant"
      @click="editor.chain().focus().toggleCodeBlock().run()"
      :active="editor.isActive('codeBlock')"
      title="Code Block"
    />
    <action-button
      icon="mdi-format-bold"
      @click="editor.chain().focus().toggleBold().run()"
      :active="editor.isActive('bold')"
      title="Bold"
    />
    <action-button
      icon="mdi-format-italic"
      @click="editor.chain().focus().toggleItalic().run()"
      :active="editor.isActive('italic')"
      title="Italic"
    />
    <action-button
      icon="mdi-format-strikethrough"
      @click="editor.chain().focus().toggleStrike().run()"
      :active="editor.isActive('strike')"
      title="Strike"
    />
    <action-button
      icon="mdi-code-tags"
      @click="editor.chain().focus().toggleCode().run()"
      :active="editor.isActive('code')"
      title="Inline Code"
    />
    <br />
    <action-button
      icon="mdi-table-row-plus-before"
      @click="editor.chain().focus().addRowBefore().run()"
      :disabled="!editor.can().addRowBefore()"
      title="Add Row Before"
    />
    <action-button
      icon="mdi-table-row-remove"
      @click="editor.chain().focus().deleteRow().run()"
      :disabled="!editor.can().deleteRow()"
      title="Delete Row"
    />
    <action-button
      icon="mdi-table-row-plus-after"
      @click="editor.chain().focus().addRowAfter().run()"
      :disabled="!editor.can().addRowAfter()"
      title="Add Row After"
    />
    <action-button
      icon="mdi-table-column-plus-before"
      @click="editor.chain().focus().addColumnBefore().run()"
      :disabled="!editor.can().addColumnBefore()"
      title="Add Column Before"
    />
    <action-button
      icon="mdi-table-column-remove"
      @click="editor.chain().focus().deleteColumn().run()"
      :disabled="!editor.can().deleteColumn()"
      title="Delete Column"
    />
    <action-button
      icon="mdi-table-column-plus-after"
      @click="editor.chain().focus().addColumnAfter().run()"
      :disabled="!editor.can().addColumnAfter()"
      title="Add Column After"
    />
    <action-button
      icon="mdi-table-merge-cells"
      @click="editor.chain().focus().mergeCells().run()"
      :disabled="!editor.can().mergeCells()"
      title="Merge Cells"
    />
    <action-button
      icon="mdi-table-split-cell"
      @click="editor.chain().focus().splitCell().run()"
      :disabled="!editor.can().splitCell()"
      title="Split Cell"
    />
  </v-sheet>
</template>
<script>
import TextEditorToolbarActionButton from "./TextEditorToolbarActionButton.vue";
export default {
  components: { ActionButton: TextEditorToolbarActionButton },
  props: {
    editor: Object,
    stickyTop: {
      type: String,
      default: "0",
    },
  },
};
</script>
<style scoped>
.text-editor-toolbar {
  position: sticky;
  z-index: 1;
}
</style>
