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
      <v-btn
        variant="text"
        color="primary"
        :disabled="!valid"
        @click="register"
      >
        Register
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { userApi } from "@/api";
import { notifiableFunction } from "@/store/notification";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const userID = ref("");
const userName = ref("");
const userPassword = ref("");
const userPassword2 = ref("");

const valid = computed(() => {
  if (userID.value.length == 0) {
    return false;
  }
  if (userName.value.length == 0) return false;
  if (userPassword.value.length == 0) return false;
  if (userPassword.value != userPassword2.value) return false;
  return true;
});

const register = notifiableFunction(
  async () => {
    await userApi.signup(userID.value, userName.value, userPassword.value);
    router.push("/auth/login");
  },
  null,
  "Register failed"
);
</script>

<style></style>
