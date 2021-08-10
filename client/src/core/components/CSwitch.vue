<template>
  <label class="control">
    <input
      class="hidden"
      type="checkbox"
      :checked="value"
      @change="$emit('input', $event.target.checked)"
    />
    <span class="inline-block relative w-12 h-12 control-button"> </span>
    <slot></slot>
  </label>
</template>

<script>
export default {
  props: ["value"],
};
</script>

<style scoped>
.control-button::before,
.control-button::after {
  @apply absolute inline-block transform -translate-y-1/2 top-1/2;
  @apply transition-all;
}

.control-button::before {
  @apply w-9 h-3 bg-gray-300 rounded-full;
  @apply -translate-x-1/2 left-1/2;
  content: "";
}
.control-button::after {
  @apply w-5 h-5 bg-gray-500 rounded-full;
  content: "";
}

.control >>> input:checked + .control-button::before {
  @apply bg-green-300;
}

.control >>> input:checked + .control-button::after {
  @apply translate-x-7 bg-green-500;
}
</style>
