<template>
  <div class="page">
    <app-bar></app-bar>
    <section class="sidebar-layout">
      <b-sidebar position="static" type="is-light" open fullheight>
        <div class="p-2 has-text-centered">
          <b-button type="is-primary my-4">Create Quiz</b-button>
          <b-menu class="has-text-left" :activable="false" :accordion="false">
            <b-menu-list>
              <router-link
                v-for="(link, index) in links"
                :key="index"
                :to="link.to"
                v-slot="{ href, isExactActive }"
              >
                <b-menu-item
                  :href="href"
                  :active="isExactActive"
                  :icon="link.icon"
                  :label="link.label"
                />
              </router-link>
            </b-menu-list>
          </b-menu>
        </div>
      </b-sidebar>
    </section>
    <router-view class="main-layout"></router-view>
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

<style>
/* 56px come from bulma */
.page .sidebar-layout {
  position: fixed;
  top: 56px;
}

/* 260px is come from bulma */
.page .main-layout {
  margin-left: 260px;
}

.page .sidebar-layout .b-sidebar {
  height: calc(100vh - 56px);
}
</style>
