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
      :value="value"
      @change="$emit('input', $event)"
    />
  </div>
</template>
<script>
export default {
  props: {
    accept: String,
    icon: String,
    label: String,
    value: null,
  },
  methods: {
    addDropFile(event) {
      const file = event.dataTransfer.files[0];

      if (file) this.$emit("input", file);
    },
  },
};
</script>
