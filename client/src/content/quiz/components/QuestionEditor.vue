<template>
  <c-card>
    <c-card-overline>Question {{ index + 1 }}</c-card-overline>
    <c-text-input
      class="w-full mb-2"
      v-model="question.question"
      multiLine
      ref="questionInput"
    ></c-text-input>

    <c-radio
      v-for="(entry, choiceIndex) in question.choices"
      :key="choiceIndex"
      v-model="question.answer"
      :name="`choices-${index}`"
      :thisValue="choiceIndex"
      class="w-full mb-2"
    >
      <c-text-input
        class="w-full"
        :value="entry"
        ref="choicesInput"
        @input="updateChoice(choiceIndex, $event)"
        multiLine
      />
    </c-radio>

    <c-card-buttons>
      <c-button
        type="primary"
        @click="$emit('save', index, question)"
        :disabled="question.question.length == 0"
      >
        Save
      </c-button>
    </c-card-buttons>
    <c-card-buttons right>
      <c-icon-button
        v-show="question.id != 'new'"
        @click="$emit('delete', index, question)"
      >
        <c-icon>delete</c-icon>
      </c-icon-button>
    </c-card-buttons>
  </c-card>
</template>

<script>
import CCardOverline from "@/components/card/CCardOverline.vue";
import CCard from "@/components/card/CCard.vue";
import CRadio from "@/components/CRadio.vue";
import CCardButtons from "@/components/card/CCardButtons.vue";
import CTextInput from "@/components/CTextInput.vue";
import CButton from "@/components/CButton.vue";
export default {
  components: {
    CCardOverline,
    CCard,
    CRadio,
    CCardButtons,
    CTextInput,
    CButton,
  },
  props: {
    question: Object,
    index: Number,
  },
  data() {
    return {
      answerResult: null,
    };
  },
  methods: {
    expandInput(com) {
      const el = com.$el;
      el.style.height = "3rem";
      const height = el.offsetHeight - el.clientHeight + el.scrollHeight;
      el.style.height = height + "px";
    },
    updateChoice(index, text) {
      this.$set(this.question.choices, index, text);
      this.expandInput(this.$refs.choicesInput[index]);
    },
  },
  watch: {
    "question.question"() {
      this.expandInput(this.$refs.questionInput);
    },
  },
  mounted() {
    this.expandInput(this.$refs.questionInput);
    for (const com of this.$refs.choicesInput) {
      this.expandInput(com);
    }
  },
};
</script>

<style scoped></style>
