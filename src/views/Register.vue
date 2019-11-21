<template>
  <form class="box form" action="none" @submit.prevent="register">
    <h1 class="title">Register</h1>
    <p class="subtext">
      <i>
        Punya akun?&nbsp;
        <router-link to="/login">Login</router-link>
      </i>
    </p>
    <hr class="hr mb-8">

    <label>ID</label>
    <input class="input w-full mb-4" type="text" v-model="userID">

    <label>Name</label>
    <input class="input w-full mb-8" type="text" v-model="userName">

    <label>Password</label>
    <input class="input w-full mb-8" type="password" v-model="userPassword">

    <label>Retry Password</label>
    <input class="input w-full mb-8" type="password" v-model="userPassword2">

    <input class="button primary" type="submit" value="Register" :disabled="!valid">
  </form>
</template>

<script>
import { User } from "../api";

export default {
  data() {
    return {
      userID: "",
      userName: "",
      userPassword: "",
      userPassword2: ""
    };
  },
  computed: {
    valid() {
      if (this.userID.length == 0) {
        return false;
      }
      if (this.userName.length == 0) return false;
      if (this.userPassword.length == 0) return false;
      if (this.userPassword != this.userPassword2) return false;
      return true;
    }
  },
  methods: {
    register() {
      User.signup(this.userID, this.userName, this.userPassword).then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style>
</style>
