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
          <molecule-jumper
            :buttons="jumperButtons"
            @click="$emit('jumperClick', $event)"
          ></molecule-jumper>
        </v-card>
      </v-col>
      <v-col>
        <h1 class="text-h4 mb-4">{{ game.quizTitle }}</h1>

        <slot />

        <dialog-finish-game
          v-model="isFinishDialogShow"
          @submit="$emit('finish')"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import DialogFinishGame from "@/dialog/DialogFinishGame.vue";
import MoleculeJumper from "./MoleculeJumper.vue";
export default {
  components: { DialogFinishGame, MoleculeJumper },
  props: {
    game: Object,
    jumperButtons: Array,
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
