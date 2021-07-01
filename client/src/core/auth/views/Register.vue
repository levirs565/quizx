<template>
  <form class="box form" action="none" @submit.prevent="register">
    <h1 class="title">Register</h1>
    <p class="subtext">
      <i>
        Punya akun?&nbsp;
        <router-link to="/auth/login">Login</router-link>
      </i>
    </p>
    <hr class="hr">

    <div class="field">
      <label>ID</label>
      <input class="input" type="text" v-model="userID">
    </div>

    <div class="field">
      <label>Name</label>
      <input class="input" type="text" v-model="userName">
    </div>

    <div class="field">
      <label>Password</label>
      <input class="input" type="password" v-model="userPassword">
    </div>

    <div class="field">
      <label>Retry Password</label>
      <input class="input" type="password" v-model="userPassword2">
    </div>

    <input class="button primary submit" type="submit" value="Register" :disabled="!valid">
  </form>
</template>

<script>
import { User } from "@/api";

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
        this.$router.push("/auth/login");
      });
    }
  }
};
</script>

<style>
</style>
