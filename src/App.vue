<template>
  <div id="app" class="flex flex-col h-full absolute w-full">
    <notification-container ref="nof"></notification-container>
    <nav ref="nav">
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
          selected: this.$route.path == '/'
        }">Home</a>
        <a
          :class="{
            selected: this.$route.path.startsWith('/permainan')
          }"
          href="/#/permainan"
        >Permainan</a>
      </div>
    </nav>
    <div class="flex flex-grow">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NotificationContainer from "./components/NotificationContainer.vue";

export default {
  components: {
    NotificationContainer
  },
  name: "app",
  data() {
    return {
      burgerActive: false,
      baseNavClass:
        "w-full lg:w-auto lg:mr-2 mt-2 lg:mt-0 py-1 px-3 block lg:inline-flex rounded",
      normalNavClass:
        "text-white hover:text-white hover:bg-green-600 border border-green-500",
      selectedNavClass:
        "bg-white text-green-500 hover:text-green-500 border border-white"
    };
  },
  computed: {
    menuClass() {
      return {
        "is-active": this.burgerActive
      };
    }
  },
  mounted() {
    this.notification.container = this.$refs.nof;
  }
};
</script>

<style>
/* @import "../node_modules/bulma/css/bulma.css"; */

/* .router-view {
  padding: 0.75rem;
}

@media screen and (min-width: 769px), print {
  .router-view {
  }
}

.linebreak {
  width: 100%;
  height: 0;
  display: block;
}

.center-margin {
  margin-left: auto !important;
  margin-right: auto !important;
}

.vcenter-margin {
  margin-top: auto !important;
  margin-bottom: auto !important;
} */

/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  padding: 0 0.5rem;
} */

/* button, input[type=button] {
  background-color: darkgreen;
  border: none;
  padding: 10px 50px;
  font-size: 16px;
  color: white;
}
button:hover, input[type=button]:hover {
  background-color: green;
}

button:active, input[type=button]:active {
  background-color: lightgreen;
}

button:disabled, input[type=button]:disabled {
  background-color: olive;
}

button.small {
  padding: 10px 20px;
}

button.selected {
  background-color: olivedrab;
} */
</style>
