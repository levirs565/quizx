<template>
  <math-field
    @input="$emit('update:modelValue', $el.value)"
    :class="{
      'bordered-math-field': bordered,
      input: bordered,
    }"
  />
</template>
<script>
import "mathlive";
import "mathlive/dist/mathlive-fonts.css";

export default {
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    bordered: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$el.value = this.modelValue;
    });
  },
  watch: {
    modelValue(value) {
      if (value == this.$el.value) return;

      this.$el.value = value;
    },
  },
};
</script>
<style scoped>
.bordered-math-field {
  display: block;
  height: auto;
}
</style>
