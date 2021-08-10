import CSwitch from "./CSwitch.vue";

export default {
  title: "Switch",
};

export const text = () => ({
  components: { CSwitch },
  data: () => ({
    check: true,
  }),
  template: `
<div>
  <c-switch name="radio" v-model="check">Checked: {{check}}</c-switch>
  <c-switch name="radio">Default</c-switch>
  <c-switch name="radio" :value="true">Default true</c-switch>
</div>
`,
});
