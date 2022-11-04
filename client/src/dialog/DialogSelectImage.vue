<template>
  <v-card>
    <v-card-title>Add Image</v-card-title>
    <v-card-text>
      <v-tabs v-model="activeTab">
        <v-tab>Upload</v-tab>
        <v-tab>Url</v-tab>
      </v-tabs>
    </v-card-text>
    <v-card-text>
      <v-tabs-items v-model="activeTab">
        <v-tab-item>
          <base-file-input
            accept="image/*"
            icon="mdi-image"
            label="Image File"
            v-model="file"
          />
        </v-tab-item>
        <v-tab-item>
          <v-text-field variant="filled" v-model="url" label="URL" />
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn variant="text" @click="$emit('cancel')">Cancel</v-btn>
      <v-btn variant="text" color="primary" @click="submit">Add</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { Media } from "@/api";
import BaseFileInput from "@/components/BaseFileInput.vue";

export default {
  components: { BaseFileInput },
  props: {
    quizId: String,
  },
  data() {
    return {
      url: "",
      file: null,
      activeTab: "upload",
    };
  },
  methods: {
    async submit() {
      const result = {
        src: null,
      };
      if (this.activeTab === 0) {
        if (!this.file) return;
        try {
          const uploadResult = await Media.upload(this.quizId, this.file);
          result.src = uploadResult.path;
        } catch (e) {
          this.showNotification({
            color: "error",
            text: `Cannot upload file: ${e.message}`,
          });
          return;
        }
      } else {
        if (this.url.trim().length == 0) return;
        result.src = this.url;
      }

      this.$emit("imageSelected", result);

      this.file = null;
      this.url = "";
    },
  },
};
</script>
