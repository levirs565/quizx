<template>
  <c-card>
    <c-card-overline>Question {{ index + 1 }}</c-card-overline>
    <b-field class="w-full">
      <b-input
        class="mb-2"
        expanded
        v-model="question.question"
        type="textarea"
        ref="questionInput"
      ></b-input>
    </b-field>

    <b-field
      v-for="(entry, choiceIndex) in question.choices"
      :key="choiceIndex"
      class="w-full"
    >
      <b-radio
        v-model="question.answer"
        :native-value="choiceIndex"
        type="is-success"
      />
      <b-input
        :value="entry"
        ref="choicesInput"
        expanded
        @input="updateChoice(choiceIndex, $event)"
        type="textarea"
      ></b-input>
    </b-field>

    <c-card-buttons right>
      <b-button
        v-show="question.id != 'new'"
        icon-right="delete"
        @click="$emit('delete', index)"
      />
    </c-card-buttons>
  </c-card>
</template>

<script>
import CCardOverline from "@/components/card/CCardOverline.vue";
import CCard from "@/components/card/CCard.vue";
import CCardButtons from "@/components/card/CCardButtons.vue";
export default {
  components: {
    CCardOverline,
    CCard,
    CCardButtons,
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
      const el = com.$el.getElementsByTagName("textarea")[0];
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
