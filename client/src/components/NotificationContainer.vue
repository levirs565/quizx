<template>
  <v-snackbar
    v-model="isSnackbarShow"
    :color="showedNotification ? showedNotification.color : ''"
    :timeout="-1"
  >
    <template v-slot:actions>
      <v-btn variant="text" @click="isSnackbarShow = false"> Close </v-btn>
    </template>

    {{ showedNotification ? showedNotification.text : "" }}
  </v-snackbar>
</template>
<script lang="ts" setup>
import {
  useNotificationStore,
  Notification,
  notificationDelayDuration,
} from "@/store/notification";
import { ref } from "vue";

const notificationStore = useNotificationStore();

let currentNotification: Notification | undefined = undefined;
const showedNotification = ref<Notification>();
const isSnackbarShow = ref(false);

notificationStore.$subscribe((_, state) => {
  if (state.currentNotification?.id == currentNotification?.id) return;

  isSnackbarShow.value = false;
  currentNotification = state.currentNotification;

  if (state.currentNotification) {
    setTimeout(() => {
      showedNotification.value = currentNotification;
      isSnackbarShow.value = true;
    }, notificationDelayDuration);
  } else {
    showedNotification.value = undefined;
  }
});
</script>
