import { configure } from "@storybook/vue";
import Vue from "vue";
import "@/router";
import "@/style.css";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import "@mdi/font/css/materialdesignicons.css";
import "@toast-ui/editor/dist/toastui-editor.css";

Vue.use(Buefy);

configure(require.context("../src", true, /\.stories\.js$/), module);
