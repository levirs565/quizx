<template>
  <node-view-wrapper
    :class="{
      'inline-math-wrapper': node.isInline,
    }"
  >
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
import MathField from "../MathField.vue";
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
    if (this.editor.state.selection.from === this.getPos()) {
      this.$nextTick(() => {
        this.focusMathField();
      });
    }
  },
  computed: {
    src: {
      get() {
        return this.node.attrs.src;
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
      if (!this.editor.isFocused) return;
      const field = this.$refs.mathField.$el;
      if (!field.hasFocus()) {
        field.focus();
      }
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
