<template>
  <nav>
    <div class="logo"></div>
    <div class="burger">
      <button @click="burgerActive = !burgerActive">
        <font-awesome icon="bars"></font-awesome>
      </button>
    </div>
    <div class="items" :class="{
        'active': burgerActive
      }">
      <navigation-link to="/">Home</navigation-link>
      <navigation-link to="/soal">Paket Soal</navigation-link>
      <navigation-link to="/permainan/config">Permainan</navigation-link>
      <navigation-link to="/login" v-show="!username">Login</navigation-link>
    </div>

    <div class="user" v-if="username" @click="toggleUserBox">
      <font-awesome icon="user" size="lg"></font-awesome>

      <div ref="userbox" class="box" v-show="showUserBox" v-click-outside="hideUserBox">
        <font-awesome icon="user" size="6x" class="w-full"></font-awesome>
        <p v-text="username.name" class="font-semibold text-center w-full mb-4"></p>

        <button class="button w-full" @click="userLogout">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
import { User } from "../api";
import NavigationLink from "./NavigationLink.vue";

export default {
  components: { NavigationLink },
  data() {
    return {
      burgerActive: false,
      showUserBox: false
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
      User.logout().then(() => {
        this.$store.dispatch("updateLogin");
      });
    }
  },
  computed: {
    username() {
      return this.$store.state.loggedIn;
    }
  }
};
</script>

<style>
</style>
