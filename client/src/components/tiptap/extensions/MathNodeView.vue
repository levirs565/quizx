<template>
  <node-view-wrapper :class="node.isInline ? 'inline-math-wrapper' : 'block'">
    <math-field
      v-model="src"
      ref="mathField"
      :read-only="readOnly"
      :default-mode="defaultMode"
      @move-out.native="mathMoveOut"
      @focus-out.native.prevent="mathMoveOut"
      @keystroke.native="mathKeyStroke"
      virtual-keyboard-mode="manual"
    />
  </node-view-wrapper>
</template>
<script>
import MathField from "@/components/math/MathField.vue";
import { NodeViewWrapper, nodeViewProps } from "@tiptap/vue-2";
import { Selection } from "prosemirror-state";
import { getPrevCursorPos } from "./CursorTracker";

export default {
  components: { NodeViewWrapper, MathField },
  props: nodeViewProps,
  data() {
    let defaultMode = "math";
    if (this.node.isInline) {
      defaultMode = "inline-math";
    }
    return {
      readOnly: !this.editor.isEditable,
      defaultMode,
    };
  },
  mounted() {
    // only useful when node is math inline
    if (this.editor.state.selection.from === this.getPos()) {
      this.$nextTick(() => {
        this.focusMathField();
      });
    }
  },
  computed: {
    src: {
      get() {
        return String(this.node.attrs.src);
      },
      set(src) {
        this.updateAttributes({
          src,
        });
      },
    },
  },
  watch: {
    selected(value) {
      if (value) {
        const nodePos = this.getPos();
        const prevPos = getPrevCursorPos(this.editor.state);
        const mathField = this.$refs.mathField.$el;
        if (prevPos <= nodePos) {
          mathField.position = 0;
        } else {
          mathField.position = mathField.lastOffset;
        }
        this.focusMathField();
      }
    },
  },
  methods: {
    focusMathField() {
      // Only useful when add math from toolbar
      // Maybe because text editor focus is delayed
      // See https://github.com/ueberdosis/tiptap/blob/ab4a0e2507b4b92c46d293a0bb06bb00a04af6e0/packages/core/src/commands/focus.ts#L33 
      requestAnimationFrame(() => {
        if (!this.editor.isFocused) return;
        const field = this.$refs.mathField.$el;
        if (!field.hasFocus()) {
          field.focus();
        }
      });
    },
    moveOutNode(isForward) {
      const view = this.editor.view;
      const targetPos = this.getPos() + (isForward ? this.node.nodeSize : 0);
      const resolvedTargetPos = view.state.doc.resolve(targetPos);
      const selection = Selection.near(resolvedTargetPos);
      view.dispatch(view.state.tr.setSelection(selection).scrollIntoView());
      view.focus();
    },
    mathMoveOut($event) {
      const isForward = $event.detail.direction === "forward";
      this.moveOutNode(isForward);
    },
    mathKeyStroke($event) {
      // Do not use this.src === "", because src will empty when field is in latex mode
      if (
        $event.detail.keystroke === "[Backspace]" &&
        this.$refs.mathField.$el.lastOffset === 0
      ) {
        this.moveOutNode(false);
        this.deleteNode();
        $event.preventDefault();
      }
    },
  },
};
</script>
<style scoped>
.inline-math-wrapper {
  display: inline-block;
}
</style>
