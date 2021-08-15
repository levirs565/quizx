<template>
  <button class="fab" @click="$emit('click', $event)">
    <slot></slot>
  </button>
</template>

<script>
export default {};
</script>

<style>
.fab {
  @apply w-14 h-14 p-4 rounded-full;
  @apply bg-green-500;
  @apply hover:bg-green-600;
}

.fab:active {
  @apply bg-green-700;
}
</style>
