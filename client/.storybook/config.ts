import { configure, addDecorator } from "@storybook/vue";
import Vue, { ComponentOptions } from "vue";
import Vuetify from 'vuetify'; // loads all components
import "@/router";
import "@mdi/font/css/materialdesignicons.css";
import 'vuetify/dist/vuetify.min.css'; // all the css for components

Vue.use(Vuetify);

const vuetify = new Vuetify({})

addDecorator((story, context) => {
  // wrap the passed component within the passed context
  const wrapped: any = story(context);
  // extend Vue to use Vuetify around the wrapped component
  return Vue.extend({
    vuetify,
    components: { wrapped },
    template: `
        <v-app>
          <v-container fluid>
            <wrapped />
          </v-container>
        </v-app>
      `,
  });
});

configure(require.context("../src", true, /\.stories\.ts$/), module);
