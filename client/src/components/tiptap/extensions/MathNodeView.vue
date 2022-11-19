<template>
  <node-view-wrapper :class="node.isInline ? 'inline-math' : ''">
    <math-live-field class="math-field" v-model="src" ref="mathLive" />
  </node-view-wrapper>
</template>
<script lang="ts">
declare global {
  interface HTMLElementEventMap {
    keystroke: CustomEvent<KeystrokeEvent>;
  }
}

interface KeystrokeEvent {
  keystroke: string;
  event: KeyboardEvent;
}
</script>
<script lang="ts" setup>
import MathLiveField from "@/components/math/MathLiveField.vue";
import { NodeViewWrapper, nodeViewProps } from "@tiptap/vue-3";
import { computed, onBeforeUnmount, ref } from "vue";
import { Selection } from "prosemirror-state";
import { nextTick, onMounted, watch } from "vue";
import { getPrevCursorPos } from "./CursorTracker";
import { FocusOutEvent, MoveOutEvent } from "mathlive";

const props = defineProps(nodeViewProps);

const mathLive = ref<InstanceType<typeof MathLiveField>>();
const mathField = computed(() => mathLive.value?.field);

const src = computed({
  get: () => String(props.node.attrs.src),
  set: (src: string) =>
    props.updateAttributes({
      src,
    }),
});

onMounted(() => {
  const field = mathField.value!;
  field.addEventListener("move-out", mathMoveOut);
  field.addEventListener("focus-out", mathMoveOut);
  field.addEventListener("keystroke", mathKeyStroke);

  let defaultMode: "math" | "inline-math" = "math";
  if (props.node.isInline) {
    defaultMode = "inline-math";
  }
  field.setOptions({
    defaultMode,
  });
  if (props.editor.state.selection.from === props.getPos()) {
    nextTick(() => {
      focusMathField();
    });
  }
});

onBeforeUnmount(() => {
  const field = mathField.value!;
  field.removeEventListener("move-out", mathMoveOut);
  field.removeEventListener("focus-out", mathMoveOut);
  field.removeEventListener("keystroke", mathKeyStroke);
});

watch(
  () => props.selected,
  (value) => {
    if (value) {
      const field = mathField.value;
      if (!field) return;

      const nodePos = props.getPos();
      const prevPos = getPrevCursorPos(props.editor.state);

      if (prevPos <= nodePos) {
        field.position = 0;
      } else {
        field.position = field.lastOffset;
      }
      focusMathField();
    }
  }
);
const focusMathField = () => {
  // Only useful when add math from toolbar
  // Maybe because text editor focus is delayed
  // See https://github.com/ueberdosis/tiptap/blob/ab4a0e2507b4b92c46d293a0bb06bb00a04af6e0/packages/core/src/commands/focus.ts#L33
  requestAnimationFrame(() => {
    if (!props.editor.isFocused) return;

    const field = mathField.value;
    if (!field!.hasFocus()) {
      field!.focus();
    }
  });
};
const moveOutNode = (isForward: boolean) => {
  const view = props.editor.view;
  const targetPos = props.getPos() + (isForward ? props.node.nodeSize : 0);
  try {
    const resolvedTargetPos = view.state.doc.resolve(targetPos);
    const selection = Selection.near(resolvedTargetPos);
    view.dispatch(view.state.tr.setSelection(selection).scrollIntoView());
    view.focus();
  } catch (e) {}
};

const mathMoveOut = (
  event: CustomEvent<MoveOutEvent> | CustomEvent<FocusOutEvent>
) => {
  if (event.type == "focus-out") {
    event.preventDefault();
  }
  const isForward = event.detail.direction === "forward";
  moveOutNode(isForward);
};
const mathKeyStroke = (event: CustomEvent<KeystrokeEvent>) => {
  // Do not use this.src === "", because src will empty when field is in latex mode
  const field = mathField.value;
  if (event.detail.keystroke === "[Backspace]" && field!.lastOffset === 0) {
    moveOutNode(false);
    props.deleteNode();
    event.preventDefault();
  }
};
</script>
<style scoped>
.inline-math {
  display: inline-block;
}

.inline-math > math-field {
  display: inline;
}

.math-field {
  white-space: normal !important;
}
</style>
