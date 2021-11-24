<template>
  <bubble-menu :editor="editor" v-if="editor" :shouldShow="shouldShow">
    <text-editor-menu-field :controls="controls" :editor="editor" />
  </bubble-menu>
</template>
<script>
import { BubbleMenu } from "@tiptap/vue-2";
import { CellSelection } from "prosemirror-tables";
import TextEditorMenuField from "./TextEditorMenuField.vue";

export default {
  components: {
    BubbleMenu,
    TextEditorMenuField,
  },
  props: {
    editor: Object,
  },
  data() {
    return {
      isRowSelection: false,
      isColSelection: false,

      controls: [
        {
          icon: "table-row-plus-before",
          action: (chain) => chain.addRowBefore(),
          show: () => this.isRowSelection,
          title: "Add Row Before",
        },
        {
          icon: "table-row-remove",
          action: (chain) => chain.deleteRow(),
          show: () => this.isRowSelection,
          title: "Delete Row",
        },
        {
          icon: "table-row-plus-after",
          action: (chain) => chain.addRowAfter(),
          show: () => this.isRowSelection,
          title: "Add Row After",
        },
        {
          icon: "table-column-plus-before",
          action: (chain) => chain.addColumnBefore(),
          show: () => this.isColSelection,
          title: "Add Column Before",
        },
        {
          icon: "table-column-remove",
          action: (chain) => chain.deleteColumn(),
          show: () => this.isColSelection,
          title: "Delete Column",
        },
        {
          icon: "table-column-plus-after",
          action: (chain) => chain.addColumnAfter(),
          show: () => this.isColSelection,
          title: "Add Column After",
        },
        {
          icon: "table-merge-cells",
          action: (chain) => chain.mergeCells(),
          show: () => true,
          title: "Merge Cells",
        },
        {
          icon: "table-split-cell",
          action: (chain) => chain.splitCell(),
          show: () => true,
          title: "Split Cell",
        },
      ],
    };
  },
  methods: {
    shouldShow({ state }) {
      const { selection } = state;
      if (!(selection instanceof CellSelection)) return false;

      this.isRowSelection = selection.isRowSelection();
      this.isColSelection = selection.isColSelection();

      return true;
    },
  },
};
</script>
