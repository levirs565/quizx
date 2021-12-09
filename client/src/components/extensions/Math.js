import { Node, InputRule, PasteRule } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-2";
import { TextSelection } from "prosemirror-state";
import MathNodeView from "./MathNodeView.vue";

function mathInputRule(character, type) {
  return new InputRule({
    find: new RegExp(`(?:^|\\s)(${character} )$`),
    handler: ({ range, match, state }) => {
      const matchOffset = match[0].lastIndexOf(match[1]);
      let start = range.from + matchOffset;
      let end = range.to;
      if (start > end) start = end;

      let selectPos = start;
      if (type.name === "mathBlock") selectPos++;

      state.tr.replaceWith(start, end, type.create());
      const selection = TextSelection.near(state.tr.doc.resolve(selectPos));
      state.tr.setSelection(selection).scrollIntoView();
    },
  });
}

const PASTE_RULE_INLINE = /(?:^|\s)(\$([^\$]+))\$/g; // eslint-disable-line
const PASTE_RULE_BLOCK = /(?:^|\s)(\$\$([^\$]+)\$\$)/g; // eslint-disable-line

function mathPasteRule(regex, type) {
  return new PasteRule({
    find: regex,
    handler: ({ range, match, state }) => {
      const src = match[2];
      const matchOffset = match[0].lastIndexOf(match[1]);
      let start = range.from + matchOffset;
      let end = range.to;
      if (start > end) start = end;

      state.tr.replaceRangeWith(start, end, type.create({ src }));
    },
  });
}

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

  addInputRules() {
    return [mathInputRule("\\$\\$", this.type)];
  },

  addPasteRules() {
    return [mathPasteRule(PASTE_RULE_BLOCK, this.type)];
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

  addInputRules() {
    return [mathInputRule("\\$", this.type)];
  },

  addPasteRules() {
    return [mathPasteRule(PASTE_RULE_INLINE, this.type)];
  },
});
