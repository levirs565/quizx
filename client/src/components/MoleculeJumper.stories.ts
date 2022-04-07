import Jumper from "./MoleculeJumper.vue";

export default { title: "Jumper" };

export const standar = () => ({
  components: {
    Jumper,
  },
  data() {
    return {
      buttons: new Array(20).fill("sucess"),
    };
  },
  template: '<jumper :buttons="buttons" style="max-width: 300px"></jumper>',
});
