<template>
  <form
    class="box form font-roboto p-6"
    @submit.prevent="$emit('submit', $event)"
  >
    <slot></slot>
  </form>
</template>

<script>
export default {};
</script>

<style></style>
