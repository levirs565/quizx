<template>
  <div class="self-center mt-4 flex-grow" :class="{ 'text-right': right }">
    <slot></slot>
  </div>
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
