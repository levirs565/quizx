import { configure } from "@storybook/vue";
import Vue from "vue";
import "@/router";
import "@/style.css";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Buefy);

configure(require.context("../src", true, /\.stories\.ts$/), module);
