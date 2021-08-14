<template>
  <div class="flex flex-col">
    <modal></modal>
    <app-bar class="z-20"></app-bar>
    <nav class="absolute w-64 h-full pt-14 text-center bg-white">
      <c-button type="primary m-4">Create Quiz</c-button>
      <ul class="text-left">
        <c-nav-item>
          <c-icon>home</c-icon>
          <span>Home</span>
        </c-nav-item>
        <c-nav-item>
          <c-icon>description</c-icon>
          <span>My Quiz</span>
        </c-nav-item>
        <c-nav-item>
          <c-icon>info</c-icon>
          <span>About</span>
        </c-nav-item>
      </ul>
    </nav>
    <div class="ml-64">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppBar from "../components/CAppBar.vue";
import Modal from "./modal/Modal";
import CNavItem from "@/components/CNavItem.vue";

export default {
  components: {
    AppBar,
    Modal,
    CNavItem,
  },
};
</script>

<style></style>
