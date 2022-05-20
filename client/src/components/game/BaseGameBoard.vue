<template>
  <v-container>
    <v-row>
      <v-col
        cols="3"
        :style="{ position: 'sticky', top: sidebarTop }"
        align-self="start"
      >
        <v-card>
          <slot name="sidebar" />
          <jumper
            :buttons="jumperButtons"
            @click="$emit('jumperClick', $event)"
          ></jumper>
        </v-card>
      </v-col>
      <v-col>
        <h1 class="text-h4 mb-4">{{ game.quizTitle }}</h1>

        <slot />

        <transition name="fade">
          <v-row class="my-4" justify="end" v-if="showButtons" no-gutters>
            <slot name="buttons" />
            <v-dialog v-model="isFinishDialogShow" max-width="350px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="error" v-on="on" v-bind="attrs"> Finish </v-btn>
              </template>
              <dialog-finish-game
                @submit="$emit('finish')"
                @close="isFinishDialogShow = false"
              />
            </v-dialog>
          </v-row>
        </transition>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import DialogFinishGame from "@/dialog/DialogFinishGame.vue";
import Jumper from "./Jumper.vue";
export default {
  components: { DialogFinishGame, Jumper },
  props: {
    game: Object,
    jumperButtons: Array,
    showButtons: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isFinishDialogShow: false,
    };
  },
  computed: {
    sidebarTop() {
      return this.$vuetify.application.top + "px";
    },
  },
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
