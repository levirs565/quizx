<template>
  <button
    v-if="!href"
    class="button"
    :class="type"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
  <a
    v-else
    class="button"
    :class="type"
    :href="href"
    @click="$emit('click', $event)"
    ><slot></slot
  ></a>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
    },
    href: {
      type: String,
    },
  },
};
</script>
<style>
.button {
  @apply inline-block align-middle px-4 h-9 cursor-pointer select-none;
  @apply bg-gray-300 text-black;
  @apply font-roboto font-medium text-button leading-9;
}

.button + .button {
  @apply ml-2;
}

.button.no-margin {
  @apply m-0;
}

.button:hover {
  @apply bg-gray-400;
}

.button:active {
  @apply bg-gray-500;
}

.button.primary {
  @apply bg-green-500;
}

.button.primary:hover {
  @apply bg-green-600;
}

.button.primary:active {
  @apply bg-green-700;
}

.button.danger {
  @apply bg-red-500;
}

.button.danger:hover {
  @apply bg-red-600;
}

.button.danger:active {
  @apply bg-red-700;
}

.button.outlined {
  @apply bg-transparent border border-gray-500;
}

.button.outlined:hover {
  @apply bg-gray-100;
}

.button.outlined:active {
  @apply bg-gray-200;
}
</style>
