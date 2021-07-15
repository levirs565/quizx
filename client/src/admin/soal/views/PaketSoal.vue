<template>
  <div>
    <div>
      <h1 class="title inline-block">
        {{ paket.name }}
        <font-awesome
          icon="edit"
          class="ml-2 cursor-pointer"
          @click="showEditPaket"
        ></font-awesome>
      </h1>
      <button class="button danger float-right" @click="deletePaket">Hapus</button>
    </div>
    <hr class="hr" />
    <ul>
      <li v-for="(question, index) in paket.soalList"
          :key="question.id">
        <question-admin :index="index" :question="question" @save="saveQuestion" @delete="deleteQuestion"/>
      </li>
    </ul>
    <button
      class="button primary float-right"
      @click="newQuestion"
      >
      Soal Baru
    </button>
  </div>
</template>

<script>
import { AdminSoal } from "@/api";
import ModalEditPaket from "../components/ModalEditPaket";
import QuestionAdmin from "../components/QuestionAdmin.vue";
import showModal from "@/admin/modal/bus";

export default {
  props: {
    paket_id: String
  },
  components: {
    QuestionAdmin
  },
  data() {
    return {
      paket: {}
    };
  },
  methods: {
    refresh() {
      AdminSoal.getPaket(this.paket_id).then(val => {
        this.paket = val;
      });
    },
    deletePaket() {
      AdminSoal.removePaket(this.paket_id).then(() => {
        this.$router.replace("/admin/soal");
      });
    },
    showEditPaket() {
      showModal(
        ModalEditPaket,
        { currentName: this.paket.name },
        this.editPaket
      );
    },
    editPaket(name) {
      AdminSoal.editPaket(this.paket_id, { name }).then(val => {
        this.paket = val;
      });
    },
    newQuestion() {
      this.paket.soalList.push({
        id: "new",
        soal: "",
        pilihan: ["", "", "", ""],
        jawaban: 0
      })
    },
    async saveQuestion(index, question, finish) {
      let result;
      if (question.id == "new") {
        result = await AdminSoal.newSoal(this.paket_id, question)
      } else {
        result = await AdminSoal.editSoal(this.paket_id, question.id, question)
      }
      this.$set(this.paket.soalList, index, result)
      finish()
    },
    async deleteQuestion(index, question, finish) {
      await AdminSoal.removeSoal(this.paket_id, question.id)
      this.$delete(this.paket.soalList, index)
      // TODO: When id is not index dependent below code are redundant
      this.refresh()
      finish()
    }
  },
  computed: {
    paketURI() {
      return `/admin/soal/${this.paket.id}`;
    }
  },
  watch: {
    paket_id() {
      this.refresh();
    }
  },
  mounted() {
    this.refresh();
  }
};
</script>

<style src="../styles/list.css" scoped>
</style>
<style lang="postcss" scoped>
.container {
  @apply flex;
}

.container > * {
  @apply flex-grow;
  min-width: calc(50% - 1rem);
}
</style>
