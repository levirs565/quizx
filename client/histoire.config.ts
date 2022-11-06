import { defineConfig } from "histoire";
import { HstVue } from "@histoire/plugin-vue";

export default defineConfig({
  plugins: [HstVue()],
  setupFile: "src/histoire.setup.ts",
  vite: {
    server: {
      fs: {
        allow: [
          "../node_modules/mathlive/dist/fonts",
          "../node_modules/@mdi/font/fonts",
        ],
      },
    },
  },
});
