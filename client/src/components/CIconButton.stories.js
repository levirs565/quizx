import CIconButton from './CIconButton.vue';
import CIcon from './CIcon.vue';

export default {
  title: "Icon Button"
}

export const homeButton = () => ({
  components: {
    CIconButton,
    CIcon
  },
  template: '<c-icon-button><c-icon>home</c-icon></c-icon-button>'
})
