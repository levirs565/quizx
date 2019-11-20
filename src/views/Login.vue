<template>
  <form class="box m-auto" action="none" @submit.prevent="login">
    <p class="title">Login</p>
    <p class="subtext">
      <i>
        Tidak punya akun?&nbsp;
        <router-link to="/register">Register</router-link>
      </i>
    </p>
    <hr class="hr mb-8">

    <label>ID</label>
    <input class="input w-full mb-4" type="text" v-model="userID">

    <label>Password</label>
    <input class="input w-full mb-8" type="password" v-model="userPassword">

    <input class="button primary" type="submit" value="Login" :disabled="!valid">
  </form>
</template>

<script>
import { User } from "../api.js";

export default {
  data() {
    return {
      userID: "",
      userPassword: ""
    };
  },
  computed: {
    valid() {
      return this.userID.length > 0 && this.userPassword.length > 0;
    }
  },
  methods: {
    login() {
      User.login(this.userID, this.userPassword).then(() => {
        this.$store.dispatch("updateLogin");
        this.$router.push("/");
      });
    }
  }
};
</script>

<style>
</style>
