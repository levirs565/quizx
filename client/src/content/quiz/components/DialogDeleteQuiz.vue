<template>
  <c-dialog @submit="$emit('submit')">
    <c-dialog-title>Delete Quiz?</c-dialog-title>
    <c-dialog-text>This action is permanent.</c-dialog-text>
    <c-dialog-buttons>
      <b-button @click.prevent="$emit('hide')">Cancel</b-button>
      <b-button type="is-danger">Delete</b-button>
    </c-dialog-buttons>
  </c-dialog>
</template>
<script>
import CDialog from "@/components/dialog/CDialog.vue";
import CDialogTitle from "@/components/dialog/CDialogTitle.vue";
import CDialogText from "@/components/dialog/CDialogText.vue";
import CDialogButtons from "@/components/dialog/CDialogButtons.vue";
export default {
  components: { CDialog, CDialogTitle, CDialogText, CDialogButtons },
};
</script>
CDialog
