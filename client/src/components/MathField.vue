<template>
  <math-field @input="$emit('input', $el.value)" />
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
      console.log(value);
    },
  },
};
</script>
