<template>
  <div id="app">
    <notification-container ref="nof"></notification-container>
    <nav class="navbar is-primary" ref="nav">
      <div class="navbar-brand">
        <a class="navbar-burger" :class="menuClass" @click="burgerActive = !burgerActive">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" :class="menuClass">
        <div class="navbar-start">
          <a class="navbar-item" href="/#/">Home</a>
          <a class="navbar-item" href="/#/permainan">Permainan</a>
        </div>
      </div>
    </nav>
    <div ref="main" class="is-flex">
      <router-view class="router-view container is-spaced vcenter-margin"></router-view>
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
      burgerActive: false
    };
  },
  computed: {
    menuClass() {
      return {
        "is-active": this.burgerActive
      };
    }
  },
  methods: {
    updateHeight() {
      let navHeight = window.appRefs.nav.getBoundingClientRect().height;
      let winHeight = window.innerHeight;
      let minHeight = winHeight - navHeight;
      window.appRefs.main.style.minHeight = minHeight + "px";
    }
  },
  mounted() {
    window.appRefs = this.$refs;
    window.apps = this;
    window.addEventListener("resize", function(ev) {
      window.apps.updateHeight();
    });
    this.updateHeight();

    this.notification.container = this.$refs.nof;
  }
};
</script>

<style>
@import "../node_modules/bulma/css/bulma.css";
@tailwind base;
@tailwind components;
@tailwind utilities;

.router-view {
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
}

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
