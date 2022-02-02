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

        <v-row class="mt-4" justify="end">
          <slot name="buttons" />
          <v-dialog v-model="isFinishDialogShow" max-width="350px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="error" v-on="on" v-bind="attrs"> Finish </v-btn>
            </template>
            <dialog-finish-game @submit="$emit('finish')" />
          </v-dialog>
        </v-row>
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
