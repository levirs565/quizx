<template>
  <bubble-menu :editor="editor" v-if="editor" :shouldShow="shouldShow">
    <b-field>
      <p class="control" v-for="control in controls" :key="control.icon">
        <b-tooltip :label="control.title">
          <b-button
            :icon-left="control.icon"
            @click="runAction(control.action)"
            v-show="control.show()"
          />
        </b-tooltip>
      </p>
    </b-field>
  </bubble-menu>
</template>
<script>
import { BubbleMenu } from "@tiptap/vue-2";
import { CellSelection } from "prosemirror-tables";

export default {
  components: {
    BubbleMenu,
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
    runAction(action) {
      const chain = this.editor.chain().focus();
      action(chain).run();
    },
  },
};
</script>
