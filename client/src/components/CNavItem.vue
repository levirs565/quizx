<template>
  <li class="nav-item" :class="{'active': active}">
    <slot></slot>
  </li>
</template>

<script>
export default {
  props: {
    'active': {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
.nav-item {
  @apply h-12 px-4 py-3 cursor-pointer select-none relative;
}

.nav-item > .material-icons {
  @apply mr-6 w-6 h-6;
}

.nav-item > .material-icons + span {
   /* TODO: make line-height bigger  */
  @apply leading-normal align-top;
  @apply font-roboto font-medium text-button;
}

.nav-item::after {
  @apply inline-block top-0 right-0 absolute;
  @apply  w-0.5 h-full;
  content: '';
}

.nav-item:hover::after, .nav-item.active::after  {
  @apply bg-current;
}

.nav-item.active {
  @apply text-green-500;
}
</style>
