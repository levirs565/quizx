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
          <v-file-input
            accept="image/*"
            prepend-icon="mdi-image"
            filled
            v-model="file"
          />
        </v-tab-item>
        <v-tab-item>
          <v-text-field filled v-model="url" label="URL" />
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn text @click="$emit('cancel')">Cancel</v-btn>
      <v-btn text color="primary" @click="submit">Add</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { Media } from "@/api";

export default {
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
          this.$buefy.toast.open({
            type: "is-danger",
            message: `Cannot upload file: ${e.message}`,
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
