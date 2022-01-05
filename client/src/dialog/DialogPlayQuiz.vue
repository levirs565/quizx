<template>
  <v-card>
    <v-card-title>Play Game</v-card-title>
    <v-card-text class="modal-card-body">
      <v-switch
        v-model="preference.isInteractive"
        label="Interactive Game"
        hide-details
      />
      <v-switch
        v-model="preference.shuffleQuestions"
        label="Shuffle Questions"
        hide-details
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn text @click="$emit('close')">Cancel</v-btn>
      <v-btn color="primary" @click="submit">Play Now</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      preference: {
        isInteractive: false,
        shuffleQuestions: false,
      },
    };
  },
  methods: {
    submit() {
      this.$emit("play", this.preference);
    },
  },
};
</script>
