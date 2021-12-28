<template>
  <div class="page">
    <app-bar></app-bar>
    <b-sidebar mobile="hide" position="static" type="is-light" open fullheight>
      <div class="p-2 has-text-centered">
        <b-button type="is-primary my-4">Create Quiz</b-button>
        <b-menu
          class="has-text-left is-custom-mobile"
          :activable="false"
          :accordion="false"
        >
          <b-menu-list>
            <router-link
              v-for="(link, index) in links"
              :key="index"
              :to="link.to"
              v-slot="{ href, isExactActive, navigate }"
            >
              <b-menu-item
                :href="href"
                :active="isExactActive"
                :icon="link.icon"
                :label="link.label"
                @click="navigate"
              />
            </router-link>
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar>
    <router-view class="main-layout container p-4"></router-view>
  </div>
</template>

<script>
import AppBar from "../components/CAppBar.vue";

export default {
  components: {
    AppBar,
  },
  data() {
    return {
      links: [
        {
          to: "/",
          icon: "home",
          label: "Home",
        },
        {
          to: "/quiz",
          icon: "file-document",
          label: "Quiz",
        },
      ],
    };
  },
};
</script>

<style></style>
