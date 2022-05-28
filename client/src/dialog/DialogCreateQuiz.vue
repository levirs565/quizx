<template>
  <v-card>
    <v-card-title class="text-h5">Create Quiz</v-card-title>
    <v-card-text>
      <v-tabs v-model="activeTab">
        <v-tab>Title</v-tab>
        <v-tab>Import JSON</v-tab>
        <v-tab>Import Markdown</v-tab>
      </v-tabs>
    </v-card-text>
    <v-card-text>
      <v-tabs-items v-model="activeTab">
        <v-tab-item>
          <v-text-field filled label="Title" v-model="title"></v-text-field>
        </v-tab-item>
        <v-tab-item>
          <v-textarea filled label="JSON" v-model="json"></v-textarea>
        </v-tab-item>
        <v-tab-item>
          <base-file-input
            label="Markdown File"
            accept=".md"
            icon="mdi-file-document"
            v-model="markdownFile"
          />
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click="$emit('close')">Cancel</v-btn>
      <v-btn color="primary" text @click="submit">Create</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import BaseFileInput from "@/components/BaseFileInput.vue";
export default {
  components: { BaseFileInput },
  data() {
    return {
      title: "",
      json: "",
      markdownFile: null,
      activeTab: 0,
    };
  },
  methods: {
    submit() {
      if (this.activeTab === 0) {
        this.$emit("create", {
          title: this.title,
        });
      } else if (this.activeTab === 1) {
        let quiz;
        try {
          quiz = JSON.parse(this.json);
        } catch (e) {
          this.showNotification({
            color: "error",
            text: `Cannot parse JSON: ${e.message}`,
          });
          return;
        }
        this.$$emit("create", quiz);
      } else if (this.activeTab === 2) {
        this.$emit("importMarkdown", this.markdownFile);
      }
    },
  },
};
</script>
