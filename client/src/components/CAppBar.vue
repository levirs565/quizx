<template>
  <b-navbar fixed-top type="is-primary" transparent>
    <template #brand>
      <b-navbar-item tag="p">QuizX</b-navbar-item>
    </template>
    <template #end>
      <router-link v-if="!username" to="/auth/login" v-slot="{ href }">
        <b-navbar-item tag="div" :href="href">
          <b-button tag="a" :href="href">Login</b-button>
        </b-navbar-item>
      </router-link>
      <b-navbar-dropdown arrowless right boxed v-else>
        <template #label>
          <b-button icon-right="account" class="rounded-full"></b-button>
        </template>

        <div class="w-48 p-4 has-text-black has-text-centered">
          <b-icon size="is-large" icon="account" />
          <p v-text="username.name" class="title is-6"></p>

          <b-button type="is-danger" @click="userLogout">Logout</b-button>
        </div>
      </b-navbar-dropdown>
    </template>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      burgerActive: false,
      showUserBox: false,
    };
  },
  methods: {
    toggleUserBox(e) {
      e.stopPropagation();
      if (this.$refs.userbox.contains(e.target)) return;
      this.showUserBox = !this.showUserBox;
    },
    hideUserBox() {
      this.showUserBox = false;
    },
    userLogout() {
      this.hideUserBox();
      this.$store.dispatch("logout");
    },
  },
  computed: {
    username() {
      return this.$store.state.core.user;
    },
  },
};
</script>

<style></style>
