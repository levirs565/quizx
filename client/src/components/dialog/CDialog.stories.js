import CDialog from "./CDialog.vue";
import CDialogTitle from "./CDialogTitle.vue";
import CDialogText from "./CDialogText.vue";
import CDialogButtons from "./CDialogButtons.vue";
import CButton from "../CButton.vue";

export default {
  title: "Dialog",
};

export const standar = () => ({
  components: { CDialog, CDialogTitle, CDialogText, CDialogButtons, CButton },
  template: `
    <c-dialog>
      <c-dialog-title>Dialog Title</c-dialog-title>
      <c-dialog-text>This is text of dialog</c-dialog-text>
      <c-dialog-buttons>
        <c-button>Cancel</c-button>
        <c-button type="primary">Submit</c-button>
      </c-dialog-buttons>
    </c-dialog> 
  `,
});
