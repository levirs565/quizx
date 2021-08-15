<template>
  <div class="flex flex-col">
    <modal></modal>
    <app-bar class="z-20"></app-bar>
    <nav class="fixed w-64 h-full top-14 text-center bg-white">
      <c-button type="primary m-4">Create Quiz</c-button>
      <ul class="text-left">
        <c-nav-link to="/">
          <c-icon>home</c-icon>
          <span>Home</span>
        </c-nav-link>
        <c-nav-link to="/quiz">
          <c-icon>description</c-icon>
          <span>My Quiz</span>
        </c-nav-link>
        <c-nav-item>
          <c-icon>info</c-icon>
          <span>About</span>
        </c-nav-item>
      </ul>
    </nav>
    <div class="ml-64 mt-14">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppBar from "../components/CAppBar.vue";
import Modal from "./modal/Modal";
import CNavItem from "@/components/CNavItem.vue";
import CNavLink from "@/components/CNavLink.vue";

export default {
  components: {
    AppBar,
    Modal,
    CNavItem,
    CNavLink,
  },
};
</script>

<style></style>
