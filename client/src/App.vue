<template>
  <transition mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import useAuthStore from "@/store/auth";

const authStore = useAuthStore();
onMounted(() => authStore.updateUser());
</script>
<style></style>
