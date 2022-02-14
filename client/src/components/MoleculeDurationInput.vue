<template>
  <v-row>
    <v-col cols="12" class="pb-0">
      <span class="text-body-1">{{ label }}</span>
    </v-col>
    <v-col cols="6">
      <v-text-field
        type="number"
        suffix="minute"
        outlined
        hide-details
        min="0"
        v-model.number="minute"
      />
    </v-col>
    <v-col cols="6">
      <v-text-field
        type="number"
        suffix="second"
        outlined
        hide-details
        min="0"
        max="59"
        v-model.number="second"
      />
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    value: {
      type: Number,
    },
    label: {
      type: String,
    },
  },
  data() {
    return {
      minute: 0,
      second: 0,
    };
  },
  methods: {
    updateValue() {
      const time = this.minute * 60 + this.second;
      this.$emit("input", time);
    },
  },
  watch: {
    minute() {
      this.updateValue();
    },
    second() {
      this.updateValue();
    },
    value: {
      immediate: true,
      handler(value) {
        this.minute = Math.floor(value / 60);
        this.second = Math.floor(value % 60);
      },
    },
  },
};
</script>
