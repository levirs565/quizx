<template>
  <div @dragover.prevent @drop.prevent="addDropFile">
    <p class="text-body-1 text--primary">
      Upload file by dropping file here or click input below
    </p>
    <v-file-input
      filled
      :label="label"
      :accept="accept"
      :prepend-icon="icon"
      v-model="files"
    />
  </div>
</template>
<script>
export default {
  props: {
    accept: String,
    icon: String,
    label: String,
    modelValue: File,
  },
  computed: {
    files: {
      get() {
        const result = [];
        if (this.modelValue) result.push(this.modelValue);
        return result;
      },
      set(val) {
        this.$emit("update:modelValue", val[0]);
      },
    },
  },
  methods: {
    addDropFile(event) {
      const file = event.dataTransfer.files[0];

      if (file) this.$emit("update:modelValue", file);
    },
  },
};
</script>
