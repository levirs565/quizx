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
      <v-window v-model="activeTab">
        <v-window-item>
          <v-text-field
            variant="filled"
            label="Title"
            v-model="title"
          ></v-text-field>
        </v-window-item>
        <v-window-item>
          <v-textarea filled label="JSON" v-model="json"></v-textarea>
        </v-window-item>
        <v-window-item>
          <base-file-input
            label="Markdown File"
            accept=".md"
            icon="mdi-file-document"
            v-model="markdownFile"
          />
        </v-window-item>
      </v-window>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn variant="text" @click="emit('close')">Cancel</v-btn>
      <v-btn color="primary" variant="text" @click="submit">Create</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts" setup>
import BaseFileInput from "@/components/BaseFileInput.vue";
import { CreateQuizParameters, CreateQuizResult } from "@quizx/shared";
import { ref } from "vue";
import { quizApi } from "@/api";
import { useNotificationStore } from "@/store/notification";
import { create } from "domain";
import { plainToInstance } from "class-transformer";

const emit = defineEmits<{
  (e: "close"): void;
  (e: "created", result: CreateQuizResult): void;
}>();

const notification = useNotificationStore();

const createQuiz = async (factory: () => Promise<CreateQuizResult>) => {
  try {
    const quizResult = await factory();
    emit("close");
    emit("created", quizResult);
  } catch (e: any) {
    console.error(e);
    let message = "Cannot create Quiz: ";
    if (e.message) message += " " + e.message;
    notification.addNotification(message, "error");
  }
};
const title = ref("");
const json = ref("");
const markdownFile = ref<File>();
const activeTab = ref(0);

const submit = () => {
  if (activeTab.value === 0) {
    const param = new CreateQuizParameters();
    param.title = title.value;
    createQuiz(() => quizApi.createQuiz(param));
  } else if (activeTab.value === 1) {
    let param: CreateQuizParameters;
    try {
      param = plainToInstance(CreateQuizParameters, JSON.parse(json.value));
    } catch (e: any) {
      notification.addNotification(`Cannot parse JSON: ${e.message}`, "error");
      return;
    }
    createQuiz(() => quizApi.createQuiz(param));
  } else if (activeTab.value === 2) {
    const file = markdownFile.value!;
    if (file) createQuiz(() => quizApi.importMarkdown(file));
  }
};
</script>
