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
      <router-link to="/" :class="{
          selected: path == '/'
        }">Home</router-link>
      <router-link to="/soal" :class="{
          selected: path == '/soal'
        }">Paket Soal</router-link>
      <router-link
        :class="{
            selected: path == '/permainan'
          }"
        to="/permainan"
      >Permainan</router-link>
      <router-link
        :class="{
          selected: path == '/login'
        }"
        to="/login"
        v-show="!username"
      >Login</router-link>
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

export default {
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
    path() {
      return this.$route.path;
    },
    username() {
      return this.$store.state.loggedIn;
    }
  }
};
</script>

<style>
</style>
