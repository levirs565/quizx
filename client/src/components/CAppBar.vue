<template>
  <header class="fixed w-full p-4 h-14 bg-green-500 flex flex-row items-center">
    <span class="text-headline6 font-medium">QuizX</span>
    <div class="flex-grow"></div>
    <div>
      <router-link v-if="!username" to="/auth/login" v-slot="{ href }">
        <c-button :href="href">Login</c-button>
      </router-link>

      <template v-else>
        <c-icon-button
          class="w-10 h-10 p-0 text-center rounded-full bg-white"
          @click="toggleUserBox"
          ><c-icon class="leading-10">person</c-icon></c-icon-button
        >

        <div
          ref="userbox"
          class="box absolute right-4 top-14 text-center"
          v-show="showUserBox"
          v-click-outside="hideUserBox"
        >
          <c-icon class="text-6xl">person</c-icon>
          <p v-text="username.name" class="font-semibold mb-4"></p>

          <c-button type="danger" @click="userLogout">Logout</c-button>
        </div>
      </template>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      burgerActive: false,
      showUserBox: false,
    };
  },
  methods: {
    toggleUserBox(e) {
      e.stopPropagation();
      if (this.$refs.userbox.contains(e.target)) return;
      this.showUserBox = !this.showUserBox;
    },
    hideUserBox() {
      this.showUserBox = false;
    },
    userLogout() {
      this.hideUserBox();
      this.$store.dispatch("logout");
    },
  },
  computed: {
    username() {
      return this.$store.state.core.user;
    },
  },
};
</script>

<style></style>
