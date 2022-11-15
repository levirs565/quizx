<template>
  <Story>
    <NotificationContainer />

    <v-text-field label="Text" v-model="text" />
    <v-text-field label="Color" v-model="color" />
    <v-btn @click="addNotification">Add Notification</v-btn>
  </Story>
</template>
<script lang="ts" setup>
import NotificationContainer from "./NotificationContainer.vue";
import { ref } from "vue";
import { useNotificationStore } from "@/store/notification";

const text = ref("This is notification");
const color = ref("success");

const addNotification = () =>
  useNotificationStore().addNotification(
    text.value + " " + Math.random(),
    color.value
  );
</script>
