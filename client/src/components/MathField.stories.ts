import MathField from "./MathField.vue";

export default {
  title: "MathField",
};

export const mathField = () => ({
  components: { MathField },
  data() {
    return {
      text: "x^2+y^2=r^2",
    };
  },
  template: `<div>
    <math-field v-model="text" read-only></math-field>
    <v-text-field type="textarea" v-model="text"/>
  </div>`,
});

export const mathFieldBordered = () => ({
  components: { MathField },
  data() {
    return {
      text: "x^2+y^2=r^2",
    };
  },
  template: `<div>
    <math-field v-model="text" bordered virtual-keyboard-mode="manual"></math-field>
    <v-text-field type="textarea" v-model="text"/>
  </div>`,
});
