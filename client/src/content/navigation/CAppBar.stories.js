import AppBar from "./Navigation.vue";
import router from "@/router";

export default { title: "Navigation" };

export const standar = () => ({
  components: {
    AppBar,
  },
  template: "<c-app-bar></c-app-bar>",
  router,
});
