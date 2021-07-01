<template>
  <div class="flex flex-row">
    <modal></modal>
    <navigation></navigation>
    <div class="content-wrap overflow-auto">
      <router-view class="py-8 px-12 flex-grow"></router-view>
    </div>
  </div>
</template>

<script>
import Navigation from "./navigation/Navigation";
import Modal from "./modal/Modal";

export default {
  components: {
    Navigation,
    Modal
  }
};
</script>

<style lang="postcss" scoped>
.content-wrap {
  @apply h-auto w-auto flex-grow flex flex-col;
}
</style>
