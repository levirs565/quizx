<template>
  <c-card>
    <c-card-overline>Question {{ index }}</c-card-overline>
    <p class="w-full mb-4" v-html="question.question"></p>

    <b-field
      v-for="(entry, choiceIndex) in question.choices"
      :key="choiceIndex"
      class="w-full"
    >
      <b-radio v-model="answer" :native-value="choiceIndex" type="is-success">
        <p v-html="entry"></p>
      </b-radio>
    </b-field>

    <c-card-buttons>
      <slot v-bind:component="this"></slot>
    </c-card-buttons>
  </c-card>
</template>

<script>
import CCardOverline from "@/components/card/CCardOverline.vue";
import CCard from "@/components/card/CCard.vue";
import CCardButtons from "@/components/card/CCardButtons.vue";
export default {
  components: { CCardOverline, CCard, CCardButtons },
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
