<template>
  <form class="flex flex-col" @submit.prevent="saveSoal">
    <div class="list-toolbox list-item mb-2">
      <button class="button danger mr-2" v-show="!isNew" @click="deleteSoal">Hapus</button>
      <input class="button primary submit" type="submit" value="Simpan">
    </div>

    <textarea class="input" v-model="soal.soal" @input="expandInput"></textarea>
    <div v-for="(entry, index) in soal.pilihan" :key="index" class="flex flex-row">
      <input type="radio" name="pilihan" :value="index" v-model="soal.jawaban">
      <textarea
        v-text="entry"
        @change="setPilihan(index, $event.target.value)"
        @input="expandInput"
        class="input flex-grow"
      ></textarea>
    </div>
  </form>
</template>

<script>
import { AdminSoal } from "@/api.js";

export default {
  props: {
    soal_id: String
  },
  data() {
    return {
      soal: {},
      isNew: false,
      paketID: 0
    };
  },
  methods: {
    refresh() {
      if (this.soal_id == "new") {
        this.soal = {
          soal: "",
          pilihan: ["", "", "", ""],
          jawaban: 0
        };
        this.isNew = true;
      } else {
        AdminSoal.getSoal(this.$attrs.paket_id, this.soal_id).then(val => {
          this.soal = val;
          this.isNew = false;
        });
      }
    },
    setPilihan(index, val) {
      this.$set(this.soal.pilihan, index, val);
    },
    expandInput(event) {
      const el = event.target;
      const height = el.offsetHeight - el.clientHeight + el.scrollHeight;
      el.style.height = height + "px";
    },
    saveSoal() {
      if (this.isNew) {
        AdminSoal.newSoal(this.paketID, this.soal).then(val => {
          this.$router.replace(`/admin/soal/${val.paketID}/${val.id}`);
          this.emitChange();
        });
      } else {
        AdminSoal.editSoal(this.paketID, this.soal_id, this.soal).then(val => {
          this.soal = val;
          this.emitChange();
        });
      }
    },
    deleteSoal() {
      AdminSoal.removeSoal(this.paketID, this.soal_id).then(() => {
        this.$router.push(`/admin/soal/${this.paketID}/`);
        this.emitChange();
      });
    },
    emitChange() {
      this.$emit("change");
    }
  },
  mounted() {
    this.paketID = this.$attrs.paket_id;
    this.refresh();
  },
  watch: {
    soal_id() {
      this.refresh();
    }
  }
};
</script>

<style src="../styles/list.css" scoped>
</style>
<style lang="postcss" scoped >
textarea {
  @apply mb-2 ml-2;
  min-height: 2rem;
  height: 3rem;
}
</style>
