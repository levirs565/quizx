<template>
  <div class="box px-3 pt-3 pb-1 buttons top-toolbar">
    <slot></slot>
  </div>
</template>
<style lang="css" scoped>
.top-toolbar {
  position: sticky;
  top: var(--app-bar-height);
  z-index: 20;
}
</style>
