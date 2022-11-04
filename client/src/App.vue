<template>
  <transition mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<script>
import useAuthStore from "@/store/auth";
import { mapActions } from "pinia";

export default {
  mounted() {
    this.updateUser();
  },
  methods: {
    ...mapActions(useAuthStore, ["updateUser"]),
  },
};
</script>

<style></style>
