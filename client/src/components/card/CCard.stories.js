import CCard from "./CCard.vue";
import CCardOverline from "./CCardOverline.vue";
import CCardButtons from "./CCardButtons.vue";
import CButton from "../CButton.vue";
import CIconButton from "../CIconButton.vue";
import CIcon from "../CIcon.vue";

export default {
  title: "Card",
};

export const standar = () => ({
  components: {
    CCard,
    CCardOverline,
    CCardButtons,
    CButton,
  },
  template: `
  <c-card>
    <c-card-overline>Overline</c-card-overline>
    <p class="w-full">Test 1</p>
    <c-card-buttons>
      <c-button type="primary">Button 1</c-button>
      <c-button>Button 2</c-button>
    </c-card-buttons>
  </c-card>`,
});

export const extended = () => ({
  components: {
    CCard,
    CCardOverline,
    CCardButtons,
    CButton,
    CIconButton,
    CIcon,
  },
  template: `
  <c-card>
    <c-card-overline>Overline Left</c-card-overline>
    <c-card-overline right>Overline Right</c-card-overline>
    <p class="w-full">Test 1</p>
    <c-card-buttons>
      <c-button type="primary">Button 1</c-button>
      <c-button>Button 2</c-button>
    </c-card-buttons>
    <c-card-buttons right>
      <c-icon-button><c-icon>delete</c-icon></c-icon-button>
    </c-card-buttons>
  </c-card>`,
});
