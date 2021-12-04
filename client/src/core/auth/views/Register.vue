<template>
  <form class="card" action="none" @submit.prevent="register">
    <div class="card-content">
      <h1 class="title">Register</h1>
      <p class="subtext">
        <i>
          Punya akun?&nbsp;
          <router-link to="/auth/login">Login</router-link>
        </i>
      </p>

      <b-field label="ID">
        <b-input type="text" v-model="userID" />
      </b-field>

      <b-field label="Name">
        <b-input type="text" v-model="userName" />
      </b-field>

      <b-field label="Password">
        <b-input type="password" v-model="userPassword" />
      </b-field>

      <b-field label="Retry Password">
        <b-input type="password" v-model="userPassword2" />
      </b-field>
    </div>

    <footer class="card-footer level">
      <div class="card-footer-item level-left buttons">
        <b-button type="is-primary" :disabled="!valid" @click="register"
          >Register</b-button
        >
      </div>
    </footer>
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
      userPassword2: "",
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
    },
  },
  methods: {
    register() {
      console.log("aaa");
      User.signup(this.userID, this.userName, this.userPassword).then(() => {
        this.$router.push("/auth/login");
      });
    },
  },
};
</script>

<style></style>
