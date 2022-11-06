import { defineSetupVue3 } from "@histoire/plugin-vue";

// Styles
import "@/style.scss";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import "mathlive";
import "mathlive/dist/mathlive-fonts.css";

// Vuetify
import { createVuetify } from "vuetify";

export const setupVue3 = defineSetupVue3(({ app }) => {
  app.use(createVuetify());
});
