<template>
  <c-dialog @submit="$emit('submit', isInteractive)">
    <c-dialog-title>Play Game</c-dialog-title>
    <c-switch v-model="isInteractive">Interactive Game</c-switch>
    <c-dialog-buttons>
      <b-button @click.prevent="$emit('hide')">Cancel</b-button>
      <b-button type="is-primary">Play Now</b-button>
    </c-dialog-buttons>
  </c-dialog>
</template>
<script>
import CDialog from "@/components/dialog/CDialog.vue";
import CDialogButtons from "@/components/dialog/CDialogButtons.vue";
import CSwitch from "@/components/CSwitch.vue";
import CDialogTitle from "@/components/dialog/CDialogTitle.vue";
export default {
  components: { CDialog, CDialogButtons, CSwitch, CDialogTitle },
  data() {
    return {
      isInteractive: false,
    };
  },
};
</script>
