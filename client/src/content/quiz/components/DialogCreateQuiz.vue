<template>
  <c-dialog @submit="$emit('submit', quizName)">
    <c-dialog-title>Create Quiz</c-dialog-title>

    <c-dialog-text>Title</c-dialog-text>
    <c-text-input class="w-full" v-model="quizName" />

    <c-dialog-buttons>
      <b-button @click.prevent="$emit('hide')">Cancel</b-button>
      <b-button type="is-primary" :disabled="quizName.length == 0"
        >Create</b-button
      >
    </c-dialog-buttons>
  </c-dialog>
</template>

<script>
import CTextInput from "@/components/CTextInput.vue";
import CDialog from "@/components/dialog/CDialog.vue";
import CDialogTitle from "@/components/dialog/CDialogTitle.vue";
import CDialogText from "@/components/dialog/CDialogText.vue";
import CDialogButtons from "@/components/dialog/CDialogButtons.vue";

export default {
  components: {
    CTextInput,
    CDialog,
    CDialogTitle,
    CDialogText,
    CDialogButtons,
  },
  data() {
    return {
      quizName: "",
    };
  },
};
</script>

<style></style>
