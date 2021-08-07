<template>
  <button class="button-icon" @click="$emit('click', $event)">
    <slot></slot>
  </button>
</template>

<script>
export default {};
</script>

<style>
.button-icon {
  @apply h-12 w-12 p-3 rounded-full;
  @apply hover:bg-gray-100;
}

.button-icon:active {
  @apply bg-gray-200;
}
</style>
