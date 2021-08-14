import CFab from './CFab.vue';
import CIcon from './CIcon.vue';

export default {
  title: "Fab"
}

export const addButton = () => ({
  components: {
    CFab,
    CIcon
  },
  template: '<c-fab><c-icon>add</c-icon></c-fab>'
})
