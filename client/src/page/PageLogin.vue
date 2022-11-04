<template>
  <v-card>
    <v-card-title>Login</v-card-title>
    <v-card-subtitle>
      <i>
        Tidak punya akun?&nbsp;
        <router-link to="/auth/register">Register</router-link>
      </i>
    </v-card-subtitle>
    <v-card-text>
      <v-form>
        <v-text-field
          type="text"
          v-model="userID"
          label="ID"
          variant="filled"
        />
        <v-text-field
          type="password"
          v-model="userPassword"
          label="Password"
          variant="filled"
        />
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn variant="text" color="primary" :disabled="!valid" @click="login">
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { User } from "@/api";
import useAuthStore from "@/store/auth";
import { mapActions } from "pinia";

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
        this.updateUser();
        this.$router.push("/");
      });
    },
    ...mapActions(useAuthStore, ["updateUser"]),
  },
};
</script>

<style></style>
