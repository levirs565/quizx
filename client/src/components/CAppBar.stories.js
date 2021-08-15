import CAppBar from "./CAppBar.vue";
import router from "@/router";

export default { title: "AppBar" };

export const standar = () => ({
  components: {
    CAppBar,
  },
  template: "<c-app-bar></c-app-bar>",
  router,
});
