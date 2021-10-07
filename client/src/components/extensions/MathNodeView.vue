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
      />
    </b-tooltip>
  </node-view-wrapper>
</template>
<script>
import MathField from "../MathField.vue";
import { NodeViewWrapper, nodeViewProps } from "@tiptap/vue-2";
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
  methods: {
    updateSrc() {},
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
