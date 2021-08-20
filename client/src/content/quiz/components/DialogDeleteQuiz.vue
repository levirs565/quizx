<template>
  <c-dialog @submit="$emit('submit')">
    <c-dialog-title>Delete Quiz?</c-dialog-title>
    <c-dialog-text>This action is permanent.</c-dialog-text>
    <c-dialog-buttons>
      <c-button @click.prevent="$emit('hide')">Cancel</c-button>
      <c-button type="danger">Delete</c-button>
    </c-dialog-buttons>
  </c-dialog>
</template>
<script>
import CDialog from "@/components/dialog/CDialog.vue";
import CDialogTitle from "@/components/dialog/CDialogTitle.vue";
import CDialogText from "@/components/dialog/CDialogText.vue";
import CDialogButtons from "@/components/dialog/CDialogButtons.vue";
import CButton from "@/components/CButton.vue";
export default {
  components: { CDialog, CDialogTitle, CDialogText, CDialogButtons, CButton },
};
</script>
CDialog
