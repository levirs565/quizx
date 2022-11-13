<template>
  <v-card>
    <v-card-title>Register</v-card-title>
    <v-card-subtitle>
      <i>
        Punya akun?&nbsp;
        <router-link to="/auth/login">Login</router-link>
      </i>
    </v-card-subtitle>
    <v-card-text class="card-content">
      <v-form>
        <v-text-field
          type="text"
          v-model="userID"
          label="ID"
          variant="filled"
        />
        <v-text-field
          type="text"
          v-model="userName"
          label="Name"
          variant="filled"
        />
        <v-text-field
          type="password"
          v-model="userPassword"
          label="Password"
          variant="filled"
        />
        <v-text-field
          type="password"
          v-model="userPassword2"
          label="Retry Password"
          variant="filled"
        />
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn variant="text" color="primary" :disabled="!valid" @click="register">
        Register
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { userApi } from "@/api";

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
      userApi.signup(this.userID, this.userName, this.userPassword).then(() => {
        this.$router.push("/auth/login");
      });
    },
  },
};
</script>

<style></style>
