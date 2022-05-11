<template>
  <math-field
    @input="$emit('input', $el.value)"
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
    value: {
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
      this.$el.value = this.value;
    });
  },
  watch: {
    value(value) {
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
