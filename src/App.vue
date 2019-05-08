<template>
  <div id="app">
    <nav class="navbar is-primary">
      <div class="navbar-brand">
        <a
          class="navbar-burger"
          :class="menuClass"
          @click="burgerActive = !burgerActive"
        >
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
    <router-view class="router-view container is-spaced"></router-view>
  </div>
</template>

<script>
export default {
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
  }
};
</script>

<style>
@import "../node_modules/bulma/css/bulma.css";

.router-view {
  padding-top: 1rem;
  padding-bottom: 1rem;
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
