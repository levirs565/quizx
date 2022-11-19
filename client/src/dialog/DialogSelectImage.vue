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
      <v-window v-model="activeTab">
        <v-window-item>
          <base-file-input
            accept="image/*"
            icon="mdi-image"
            label="Image File"
            v-model="file"
          />
        </v-window-item>
        <v-window-item>
          <v-text-field variant="filled" v-model="url" label="URL" />
        </v-window-item>
      </v-window>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn variant="text" @click="emit('close')">Cancel</v-btn>
      <v-btn variant="text" color="primary" @click="submit">Add</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
export const uploadFunctionInjectionKey = Symbol("uploadFunctionKey");
</script>
<script lang="ts" setup>
import BaseFileInput from "@/components/BaseFileInput.vue";
import { useNotificationStore } from "@/store/notification";
import { inject, ref } from "vue";

export interface ImageResult {
  src: string;
}

const emit = defineEmits<{
  (e: "close"): void;
  (e: "submit", result: ImageResult): void;
}>();

const notification = useNotificationStore();

const url = ref("");
const file = ref<File>();
const activeTab = ref(0);

const uploadFunction = inject<(file: File) => Promise<string>>(
  uploadFunctionInjectionKey
);

const submit = async () => {
  if (activeTab.value === 0) {
    if (!file.value) return;
    try {
      const path = await uploadFunction!(file.value);
      emit("close");
      emit("submit", {
        src: path,
      });
    } catch (e: any) {
      notification.addNotification(`Cannot upload file: ${e.message}`, "error");
      return;
    }
  } else {
    const urlTrim = url.value.trim();
    if (urlTrim.length == 0) return;
    emit("close");
    emit("submit", {
      src: urlTrim,
    });
  }

  file.value = undefined;
  url.value = "";
};
</script>
