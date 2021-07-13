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
      <li v-for="question in paket.soalList"
          :key="question.id">
        <question
          :question="question"
          class="box my-4"
        >
        </question>
      </li>
    </ul>
    <button
      class="button primary float-right"
      >Soal Baru</button>
  </div>
</template>

<script>
import { AdminSoal } from "@/api";
import ModalEditPaket from "../components/ModalEditPaket";
import showModal from "@/admin/modal/bus";
import Question from "@/content/quiz/components/Question.vue";

export default {
  props: {
    paket_id: String
  },
  components: {
    Question
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
