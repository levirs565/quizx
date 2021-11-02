import Table from "@tiptap/extension-table";
import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import { CellSelection } from "prosemirror-tables";

export default Table.extend({
  addProseMirrorPlugins() {
    return [
      ...this.parent(),
      new Plugin({
        key: new PluginKey("TableCellSelectionDecorator"),
        props: {
          decorations(state) {
            // Adapted from https://github.com/ProseMirror/prosemirror-tables/blob/6b16ed3cf306886f2c169aebbe60701e1ac2deac/src/cellselection.js#L233
            if (!(state.selection instanceof CellSelection)) return null;
            let cells = [];
            state.selection.forEachCell((node, pos) => {
              cells.push(
                Decoration.node(pos, pos + node.nodeSize, {
                  class: "is-selected",
                })
              );
            });
            return DecorationSet.create(state.doc, cells);
          },
        },
      }),
    ];
  },
}).configure({
  HTMLAttributes: {
    class: "table is-bordered",
  },
});
