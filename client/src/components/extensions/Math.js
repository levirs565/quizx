import { Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-2";
import MathNodeView from "./MathNodeView.vue";

export const MathBlock = Node.create({
  name: "mathBlock",
  group: "block",

  addAttributes() {
    return {
      src: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "math-block",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["math-block", HTMLAttributes];
  },

  addNodeView() {
    return VueNodeViewRenderer(MathNodeView);
  },
});

export const MathInline = Node.create({
  name: "math",
  group: "inline",
  inline: true,

  addAttributes() {
    return {
      src: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "math",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["math", HTMLAttributes];
  },

  addNodeView() {
    return VueNodeViewRenderer(MathNodeView);
  },
});
