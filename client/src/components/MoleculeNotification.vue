<template>
  <v-snackbar
    v-model="isSnackbarShow"
    :color="currentNotification ? currentNotification.color : ''"
  >
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="isSnackbarShow = false"> Close </v-btn>
    </template>

    {{ currentNotification ? currentNotification.text : "" }}
  </v-snackbar>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import { Notification } from "@/store/notification";

export default Vue.extend({
  props: {
    notification: Object as PropType<Notification>,
  },
  data() {
    return {
      currentNotification: undefined,
      isSnackbarShow: false,
      notificationQueue: [],
      timeoutId: 0,
    } as {
      currentNotification?: Notification;
      isSnackbarShow: Boolean;
      notificationQueue: Notification[];
      timeoutId: Number;
    };
  },
  methods: {
    showNextNotification() {
      if (this.notificationQueue.length == 0)
        console.error("Notification queue is blank");

      this.currentNotification = this.notificationQueue.shift();
      this.isSnackbarShow = true;

      if (this.notificationQueue.length >= 1) {
        this.queueNextNotification();
      }
    },
    queueNextNotification() {
      this.timeoutId = setTimeout(() => {
        this.isSnackbarShow = false;
        this.timeoutId = setTimeout(() => {
          this.timeoutId = 0;
          this.showNextNotification();
        }, 250);
      }, 1000);
    },
  },
  watch: {
    notification(val: Notification) {
      this.notificationQueue.push(val);
      if (this.timeoutId == 0 && !this.isSnackbarShow) {
        this.showNextNotification();
        return;
      }

      if (this.timeoutId == 0) {
        this.queueNextNotification();
      }
    },
  },
});
</script>
>
