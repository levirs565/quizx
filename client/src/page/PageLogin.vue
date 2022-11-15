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

<script lang="ts" setup>
import { userApi } from "@/api";
import useAuthStore from "@/store/auth";
import { notifiableFunction } from "@/store/notification";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const userID = ref("");
const userPassword = ref("");

const valid = computed(
  () => userID.value.length > 0 && userPassword.value.length > 0
);

const login = notifiableFunction(
  async () => {
    await userApi.login(userID.value, userPassword.value);
    authStore.updateUser();
    router.push("/");
  },
  null,
  "Login failed"
);
</script>

<style></style>
