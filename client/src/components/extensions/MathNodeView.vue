<template>
  <node-view-wrapper
    :class="{
      'inline-math-wrapper': node.isInline,
    }"
  >
    <b-tooltip always :active="isShowTooltip" class="math-tooltip">
      <template v-slot:content>
        <b-field grouped v-if="isShowRawEdit">
          <b-input v-model="src" type="textarea" class="math-raw-input" />
          <p class="control">
            <b-button size="is-small" @click="hideRawEdit">Close</b-button>
          </p>
        </b-field>
        <template v-else>
          <b-button size="is-small" @click="showRawEdit">Edit Source</b-button>
          <b-button icon-right="keyboard" @click="toggleKeyboard" />
        </template>
      </template>
      <math-field
        v-model="src"
        ref="mathField"
        :read-only="readOnly"
        :default-mode="defaultMode"
        @focus.native="toggleTooltip(true)"
        @blur.native="toggleTooltip(false)"
        @move-out.native="mathMoveOut"
        @focus-out.native.prevent="mathMoveOut"
        @keystroke.native="mathKeyStroke"
      />
    </b-tooltip>
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
      isShowTooltip: false,
      isShowRawEdit: false,
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
      const field = this.$refs.mathField.$el;
      if (!field.hasFocus()) {
        field.focus();
      }
    },
    toggleTooltip(state) {
      if (this.readOnly) return;
      this.isShowTooltip = state;
    },
    showRawEdit() {
      this.isShowRawEdit = true;
      this.isShowTooltip = true;
    },
    hideRawEdit() {
      this.isShowRawEdit = false;
      this.isShowTooltip = false;
    },
    toggleKeyboard() {
      this.$refs.mathField.$el.executeCommand(["toggleVirtualKeyboard"]);
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
      if ($event.detail.keystroke === "[Backspace]" && this.src === "") {
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
.math-raw-input {
  min-width: 256px;
}
.math-tooltip {
  width: 100%;
}
</style>
