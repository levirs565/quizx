<template>
  <router-link :to="to" v-slot="{ navigate, isExactActive }">
    <c-nav-item :active="isExactActive" @click="navigate">
      <slot></slot>
    </c-nav-item>
  </router-link>
</template>

<script>
import CNavItem from "@/components/CNavItem.vue";
export default {
  components: {
    CNavItem,
  },
  props: {
    to: String,
  },
};
</script>

<style></style>
