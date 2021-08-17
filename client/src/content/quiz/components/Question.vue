<template>
  <c-card>
    <c-card-overline>Question {{ index }}</c-card-overline>
    <p class="w-full mb-4" v-html="question.question"></p>

    <c-radio
      v-for="(entry, choiceIndex) in question.choices"
      :key="choiceIndex"
      v-model="answer"
      :name="`choices-${index}`"
      :thisValue="choiceIndex"
      class="w-full"
    >
      <p v-html="entry"></p>
    </c-radio>

    <c-card-buttons>
      <slot v-bind:component="this"></slot>
    </c-card-buttons>
  </c-card>
</template>

<script>
import CCardOverline from "@/components/card/CCardOverline.vue";
import CCard from "@/components/card/CCard.vue";
import CRadio from "@/components/CRadio.vue";
import CCardButtons from "@/components/card/CCardButtons.vue";
export default {
  components: { CCardOverline, CCard, CRadio, CCardButtons },
  props: {
    question: Object,
    initialAnswer: {
      type: Number,
      default: -1,
    },
    index: Number,
  },
  data() {
    return {
      answer: this.initialAnswer,
      extraData: {},
    };
  },
  methods: {},
  watch: {
    answer() {
      this.$emit("answerChanged", this);
    },
  },
};
</script>

<style scoped></style>
