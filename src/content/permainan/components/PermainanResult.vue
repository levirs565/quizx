<template>
  <ul class="list-none">
    <li>Hasil Permainan</li>
    <template v-for="(item, index) in items ">
      <li :class="[item.color]" :key="index">
        <font-awesome :icon="item.icon"></font-awesome>
        &nbsp;{{ item.prop }}
        <span class="float-right" :class="[item.color]">{{ item.val }}</span>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  props: ["results"],
  computed: {
    items() {
      if (!this.results) return [];
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
          val: this.results.tidakDiJawab,
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
