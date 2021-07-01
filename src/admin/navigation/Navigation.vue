<template>
  <nav>
    <div class="nav-user">
      <font-awesome icon="user" size="3x"></font-awesome>
    </div>
    <ul class="nav-items">
      <navigation-link to="/admin">Home</navigation-link>
      <navigation-link to="/admin/soal">Soal</navigation-link>
      <navigation-link to="/admin/about">About</navigation-link>
    </ul>
  </nav>
</template>

<script>
import NavigationLink from "./components/NavigationLink";

export default {
  components: {
    NavigationLink
  }
};
</script>

<style src='./style.css' scoped>
</style>
