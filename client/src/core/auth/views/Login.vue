<template>
  <form class="card" action="none" @submit.prevent="login">
    <div class="card-content">
      <p class="title">Login</p>
      <p class="subtext">
        <i>
          Tidak punya akun?&nbsp;
          <router-link to="/auth/register">Register</router-link>
        </i>
      </p>

      <b-field label="ID">
        <b-input type="text" v-model="userID" />
      </b-field>

      <b-field label="Password">
        <b-input type="password" v-model="userPassword" />
      </b-field>
    </div>

    <footer class="card-footer level">
      <div class="card-footer-item level-left buttons">
        <b-button type="is-primary" :disabled="!valid" @click="login"
          >Login</b-button
        >
      </div>
    </footer>
  </form>
</template>

<script>
import { User } from "@/api.js";

export default {
  data() {
    return {
      userID: "",
      userPassword: "",
    };
  },
  computed: {
    valid() {
      return this.userID.length > 0 && this.userPassword.length > 0;
    },
  },
  methods: {
    login() {
      User.login(this.userID, this.userPassword).then(() => {
        this.$store.dispatch("updateUser");
        this.$router.push("/");
      });
    },
  },
};
</script>

<style></style>
