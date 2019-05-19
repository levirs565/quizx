<template>
  <div id="app" class="flex flex-col h-full absolute w-full">
    <notification-container ref="nof"></notification-container>
    <nav class="flex bg-green-500 h-16 px-6 items-center" ref="nav">
      <!-- <div class="navbar-brand">
        <a class="navbar-burger" :class="menuClass" @click="burgerActive = !burgerActive">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>-->
      <div class :class="menuClass">
        <div class>
          <a
            :class="[baseNavClass,  this.$route.path == '/' ? selectedNavClass: normalNavClass]"
            href="/#/"
          >Home</a>
          <a
            :class="[baseNavClass, this.$route.path.startsWith('/permainan') ? selectedNavClass: normalNavClass]"
            href="/#/permainan"
          >Permainan</a>
        </div>
      </div>
    </nav>
    <router-view class="flex"></router-view>
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
      baseNavClass: "mr-3 inline-block py-1 px-6 rounded",
      normalNavClass: "text-white hover:text-white hover:bg-green-600",
      selectedNavClass:
        "bg-white hover:bg-white text-green-500 hover:text-green-500"
    };
  },
  computed: {
    menuClass() {
      return {
        "is-active": this.burgerActive
      };
    }
  }
};
</script>

<style>
@import "../node_modules/bulma/css/bulma.css";
@tailwind base;
@tailwind components;
@tailwind utilities;

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
