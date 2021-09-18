<template>
  <header
    class="fixed top-0 w-full p-4 h-14 bg-green-500 flex flex-row items-center z-20"
  >
    <span class="text-headline6 font-medium">QuizX</span>
    <div class="flex-grow"></div>
    <div>
      <router-link v-if="!username" to="/auth/login" v-slot="{ href }">
        <b-button :href="href">Login</b-button>
      </router-link>

      <template v-else>
        <b-button
          class="w-10 h-10 p-0 text-center rounded-full bg-white"
          @click="toggleUserBox"
          icon-right="account"
        />

        <div
          ref="userbox"
          class="box absolute right-4 top-14 text-center"
          v-show="showUserBox"
          v-click-outside="hideUserBox"
        >
          <b-icon size="is-large" class="text-6xl" icon="account" />
          <p v-text="username.name" class="font-semibold mb-4"></p>

          <b-button type="is-danger" @click="userLogout">Logout</b-button>
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
