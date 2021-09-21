<template>
  <div class="auth-layout">
    <router-view class="auth-content"></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.auth-layout {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.auth-layout >>> .auth-content {
  max-width: 384px;
  width: 100%;
}
</style>
