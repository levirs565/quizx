<template>
  <div class="box my-4">
    <div class="overflow-auto mb-4">
      <span>Soal ke {{question.id + 1}}</span>
      <button class="button danger ml-4 float-right" v-show="question">
        Hapus
      </button>
      <button class="button primary float-right" @click="toEditMode" v-show="!isEditMode">
        Edit
      </button>
      <button class="button primary float-right" @click="saveQuestion" v-show="isEditMode">
        Save
      </button>
    </div>

    <question
      v-if="!isEditMode"
      :question="question"
      :initialAnswer="question.jawaban"
      :radioEnabled="false"
    >
    </question>
    <form v-else class="overflow-auto edit-view">
      <textarea
        class="input w-full"
        v-model="question.soal"
        @input="expandInput"
        tabindex="1"
      />
      <div
        v-for="(entry, index) in question.pilihan"
        :key="index"
        class="flex flex-row items-center pilihan"
      >
        <input
          type="radio"
          name="pilihan"
          :value="index"
          v-model="question.jawaban"
        />
        <textarea
          v-text="entry"
          @change="setChoiceText(index, $event.target.value)"
          @input="expandInput"
          class="input flex-grow"
          :tabindex="index + 2"
        />
        <button class="button danger" @click="deleteChoice(index)">
          <font-awesome icon="trash"/>
        </button>
      </div>

      <button class="button primary float-right" @click="newChoice">Pilihan Baru</button>
    </form>
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
    },
    toEditMode() {
      this.isEditMode = true
      this.refreshTextArea()
    },
    expandInput(event) {
      const el = event.target;
      el.style.height = "3rem";
      const height = el.offsetHeight - el.clientHeight + el.scrollHeight;
      el.style.height = height + "px";
    },
    refreshTextArea() {
      this.$nextTick(() => {
        const arr = this.$el.getElementsByTagName("textarea");
        for (let i = 0; i < arr.length; i++) {
          const target = arr[i];

          this.expandInput({ target });
        }
      });
    },
    setChoiceText(index, val) {
      this.$set(this.question.pilihan, index, val);
    },
    deleteChoice(index) {
      this.$delete(this.question.pilihan, index);
    },
    newChoice() {
      this.question.pilihan.push("");
    },
  }
};
</script>

<style scoped>
.edit-view > * {
  @apply mb-2;
}
</style>
