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
      <a href="/#/" :class="{
          selected: rId == 'home'
        }">Home</a>
      <a
        :class="{
            selected: rId == 'permainan'
          }"
        href="/#/permainan"
      >Permainan</a>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      burgerActive: false,
    }
  },
  computed: {
    rId() {
      return this.$route.alias;
    }
  }
};
</script>

<style>
</style>
