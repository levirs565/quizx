<template>
  <nav>
    <button class="nav-burger" @click="burgerActive = !burgerActive">
      <font-awesome icon="bars"></font-awesome>
    </button>
    <div class="nav-logo">
      <span>soalku</span>
    </div>
    <div class="nav-items" :class="{
        'active': burgerActive
      }">
      <div class="start">
        <navigation-link to="/">Home</navigation-link>
        <navigation-link to="/soal">Paket Soal</navigation-link>
        <navigation-link to="/permainan/config">Permainan</navigation-link>
      </div>

      <div class="end" v-if="!username">
        <router-link class="button mr-4" to="/auth/login">Login</router-link>
        <router-link class="button" to="/auth/register">Register</router-link>
      </div>

      <div class="end user" v-else @click="toggleUserBox">
        <font-awesome icon="user" size="lg"></font-awesome>

        <div ref="userbox" class="box" v-show="showUserBox" v-click-outside="hideUserBox">
          <font-awesome icon="user" size="6x" class="w-full"></font-awesome>
          <p v-text="username.name" class="font-semibold text-center w-full mb-4"></p>

          <button class="button w-full" @click="userLogout">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import NavigationLink from "./components/NavigationLink.vue";

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
      this.$store.dispatch("logout");
    }
  },
  computed: {
    username() {
      return this.$store.state.core.user;
    }
  }
};
</script>

<style src="./style.css" scoped>
</style>
