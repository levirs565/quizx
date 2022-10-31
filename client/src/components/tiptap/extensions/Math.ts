import {
  Node,
  InputRule,
  PasteRule,
  RawCommands,
  CommandProps,
} from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-2";
import { NodeType } from "prosemirror-model";
import { Selection, Transaction } from "prosemirror-state";
import { ReplaceStep, ReplaceAroundStep } from "prosemirror-transform";
import { VueConstructor } from "vue";
import MathNodeView from "./MathNodeView.vue";

// source: https://github.com/ProseMirror/prosemirror-state/blob/master/src/selection.js#L466
export default function selectionToMathStart(tr: Transaction<any>) {
  /* We must use mapping because replaceRangeWith when used for math block have 2 diffrent options
    When current line is blank, this will replace line by math
    Otherwise, this will insert math after end of line
   */

  const last = tr.steps.length - 1;
  const step = tr.steps[last];

  if (!(step instanceof ReplaceStep || step instanceof ReplaceAroundStep)) {
    return;
  }

  const map = tr.mapping.maps[last];
  let end = 0;
  let start = 0;

  map.forEach((_from, _to, newFrom, newTo) => {
    if (end === 0) {
      end = newTo;
    }
    if (start === 0) {
      start = newFrom;
    }
  });

  /*
    When end - start = 1, 
      range is replaced directly (start = start math node)
    Otherwise, prosemirror insert math node after end of current line
      start is end of current line, 
      start + 1 is start of math node
  */
  let selectPos = start;
  if (end - start > 1) selectPos++;

  tr.setSelection(Selection.near(tr.doc.resolve(selectPos), 0));
}

function mathInputRule(character: String, type: NodeType) {
  return new InputRule({
    find: new RegExp(`(?:^|\\s)(${character} )$`),
    handler: ({ range, match, state }) => {
      const matchOffset = match[0].lastIndexOf(match[1]);
      let start = range.from + matchOffset;
      const end = range.to;
      if (start > end) start = end;

      state.tr.replaceRangeWith(start, end, type.create());
      selectionToMathStart(state.tr);
    },
  });
}

const PASTE_RULE_INLINE = /(?:^|\s)(\$([^\$]+))\$/g; // eslint-disable-line
const PASTE_RULE_BLOCK = /(?:^|\s)(\$\$([^\$]+)\$\$)/g; // eslint-disable-line

function mathPasteRule(regex: RegExp, type: NodeType) {
  return new PasteRule({
    find: regex,
    handler: ({ range, match, state }) => {
      const src = match[2];
      const matchOffset = match[0].lastIndexOf(match[1]);
      let start = range.from + matchOffset;
      const end = range.to;
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
    // I do not know why this needed
    return VueNodeViewRenderer(MathNodeView as unknown as VueConstructor);
  },

  addInputRules() {
    return [mathInputRule("\\$\\$", this.type)];
  },

  addPasteRules() {
    return [mathPasteRule(PASTE_RULE_BLOCK, this.type)];
  },

  addCommands() {
    return {
      addMathBlock:
        () =>
        ({ commands, tr }: CommandProps) => {
          tr.replaceRangeWith(
            tr.selection.from,
            tr.selection.from,
            this.type.create()
          );
          selectionToMathStart(tr);
          return true;
        },
    } as Partial<RawCommands>;
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
      {
        tag: "math-inline",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["math-inline", HTMLAttributes];
  },

  addNodeView() {
    return VueNodeViewRenderer(MathNodeView as unknown as VueConstructor);
  },

  addInputRules() {
    return [mathInputRule("\\$", this.type)];
  },

  addPasteRules() {
    return [mathPasteRule(PASTE_RULE_INLINE, this.type)];
  },

  addCommands() {
    return {
      addMathInline:
        () =>
        ({ commands, tr }: CommandProps) => {
          tr.replaceRangeWith(
            tr.selection.from,
            tr.selection.from,
            this.type.create()
          );
          selectionToMathStart(tr);
          return true;
        },
    } as Partial<RawCommands>;
  },
});
