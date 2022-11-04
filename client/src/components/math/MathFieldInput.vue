<template>
  <v-input>
    <v-field v-bind="$attrs">
      <math-field
        ref="mathLive"
        class="math-field-input px-4 py-2"
        @input="$emit('update:modelValue', $refs.mathLive.value)"
        v-bind="mathFieldAttrs"
      />
    </v-field>
  </v-input>
</template>
<script>
export default {
  props: {
    modelValue: String,
    virtualKeyboardContainer: HTMLElement,
  },
  emits: ["update:modelValue"],
  mounted() {
    this.$nextTick(() => {
      this.$refs.mathLive.setOptions({
        virtualKeyboardContainer: this.virtualKeyboardContainer
          ? this.virtualKeyboardContainer
          : document.body,
      });
      this.$refs.mathLive.value = this.modelValue;
    });
  },
  computed: {
    mathFieldAttrs() {
      const { readonly, ...attrs } = this.$attrs;

      if (readonly) attrs["read-only"] = "";

      return attrs;
    },
  },
  watch: {
    modelValue(value) {
      if (value == this.$refs.mathLive.value) return;

      this.$refs.mathLive.value = value;
    },
  },
};
</script>
<style>
.math-field-input {
  flex-grow: 1;
  align-self: center;
  outline: none !important;
}
</style>
