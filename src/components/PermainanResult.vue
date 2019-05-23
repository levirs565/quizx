<template>
  <div class="permainan-result flex flex-wrap">
    <p class="w-full">Hasil Permainan</p>
    <template v-for="(item, index) in items ">
      <p class="w-4/6 text-left" :class="[item.color]" :key="index + 'a'">
        <font-awesome :icon="item.icon"></font-awesome>
        &nbsp;{{ item.prop }}
      </p>
      <p class="w-2/6 text-right" :class="[item.color]" :key="index + 'b'">{{ item.val }}</p>
    </template>
  </div>
</template>

<script>
export default {
  props: ["results"],
  computed: {
    items() {
      return [
        {
          prop: "Benar",
          val: this.results.benar,
          color: "text-green-600",
          icon: "check"
        },
        {
          prop: "Salah",
          val: this.results.salah,
          color: "text-red-600",
          icon: "times"
        },
        {
          prop: "Tidak Di Jawab",
          val: this.results.takDiJawab,
          color: "text-yellow-600",
          icon: "exclamation"
        }
      ];
    }
  }
};
</script>

<style>
.tleft {
  text-align: left;
}

.tright {
  text-align: right;
}

.svg-inline--fa {
  width: 1em !important;
}
</style>
