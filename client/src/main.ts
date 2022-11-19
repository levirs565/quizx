import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./style.scss";
import "@mdi/font/css/materialdesignicons.css";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import vuetify from "./plugins/vuetify";
import notification from "./plugins/notification";
import { mathKeyboardContainerInjectionKey } from "./components/math/key";

// Vue.config.productionTip = false;

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(pinia);
app.use(notification);
app.provide(mathKeyboardContainerInjectionKey, document.body);

app.mount("#app");
