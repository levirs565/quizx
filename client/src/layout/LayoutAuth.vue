<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height">
        <v-row align="center" justify="center" class="fill-height">
          <router-view class="auth-form" />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {};
</script>
<style scoped>
.auth-form {
  min-width: 350px;
}
</style>
