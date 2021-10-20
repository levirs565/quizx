import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";

const name = "cursorTracker";
const pluginKey = new PluginKey(name);

export const CursorTracker = Extension.create({
  name,
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: pluginKey,
        props: {},
        state: {
          // eslint-disable-next-line no-unused-vars
          init(config, instance) {
            return {
              prevCursorPos: 0,
            };
          },
          // eslint-disable-next-line no-unused-vars
          apply(tr, value, oldState, newState) {
            return {
              prevCursorPos: oldState.selection.from,
            };
          },
        },
      }),
    ];
  },
});

export function getPrevCursorPos(editorState) {
  return pluginKey.getState(editorState).prevCursorPos;
}
