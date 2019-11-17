<template>
  <nav>
    <div class="logo"></div>
    <div class="burger">
      <button @click="burgerActive = !burgerActive">
        <font-awesome icon="bars"></font-awesome>
      </button>
    </div>
    <div class="items" :class="{
        'active': burgerActive
      }">
      <router-link to="/" :class="{
          selected: path == '/'
        }">Home</router-link>
      <router-link to="/soal" :class="{
          selected: path == '/soal'
        }">Koleksi Soal</router-link>
      <router-link
        :class="{
            selected: path == '/permainan'
          }"
        to="/permainan"
      >Permainan</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      burgerActive: false
    };
  },
  computed: {
    path() {
      return this.$route.path;
    }
  }
};
</script>

<style>
</style>
