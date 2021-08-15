<template>
  <p
    class="text-overline mb-2 flex-grow"
    :class="{ 'text-right': right }"
  >
    <slot></slot>
  </p>
</template>
<script>
export default {
  props: {
    right: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
