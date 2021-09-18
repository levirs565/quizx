<template>
  <c-dialog @submit="$emit('submit', isInteractive)">
    <c-dialog-title>Play Game</c-dialog-title>
    <b-field>
      <b-switch v-model="isInteractive">Interactive Game</b-switch>
    </b-field>
    <c-dialog-buttons>
      <b-button @click.prevent="$emit('hide')">Cancel</b-button>
      <b-button type="is-primary">Play Now</b-button>
    </c-dialog-buttons>
  </c-dialog>
</template>
<script>
import CDialog from "@/components/dialog/CDialog.vue";
import CDialogButtons from "@/components/dialog/CDialogButtons.vue";
import CDialogTitle from "@/components/dialog/CDialogTitle.vue";
export default {
  components: { CDialog, CDialogButtons, CDialogTitle },
  data() {
    return {
      isInteractive: false,
    };
  },
};
</script>
