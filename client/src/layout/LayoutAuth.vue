<template>
  <v-app>
    <NotificationContainer />
    <v-main>
      <v-container fluid class="fill-height">
        <v-row align="center" justify="center" class="fill-height">
          <router-view class="auth-form" />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import NotificationContainer from "@/components/NotificationContainer.vue";
</script>
<style scoped>
.auth-form {
  min-width: 350px;
}
</style>
