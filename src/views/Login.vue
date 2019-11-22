<template>
  <form class="box form" action="none" @submit.prevent="login">
    <p class="title">Login</p>
    <p class="subtext">
      <i>
        Tidak punya akun?&nbsp;
        <router-link to="/register">Register</router-link>
      </i>
    </p>
    <hr class="hr">

    <div class="field">
      <label class="font-sans">ID</label>
      <input class="input" type="text" v-model="userID">
    </div>

    <div class="field">
      <label>Password</label>
      <input class="input" type="password" v-model="userPassword">
    </div>

    <input class="button primary submit" type="submit" value="Login" :disabled="!valid">
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
