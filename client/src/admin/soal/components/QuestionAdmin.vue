<template>
  <div
    class="box my-4"
    >
    <div class="overflow-auto">
      <span>Soal ke {{question.id + 1}}</span>
      <button class="button danger ml-4 float-right" v-show="question">
        Hapus
      </button>
      <button class="button primary float-right" @click="isEditMode = true" v-show="!isEditMode">
        Edit
      </button>
      <button class="button primary float-right" @click="saveQuestion" v-show="isEditMode">
        Save
      </button>
    </div>

    <question
      :question="question"
      :initialAnswer="question.jawaban"
      :radioEnabled="false"
    >
    </question>
  </div>
</template>

<script>
import Question from "@/content/quiz/components/Question.vue";

export default {
  components: {
    Question
  },
  props: {
    question: Object
  },
  data() {
    return {
      isEditMode: false
    };
  },
  methods: {
    saveQuestion() {
      this.isEditMode = false
    }
  }
};
</script>

<style>
</style>
