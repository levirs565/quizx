<template>
  <v-card>
    <v-card-title>Finish Game?</v-card-title>
    <v-card-text>Make sure all questions are answered correctly.</v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn text @click="$emit('input', false)">Cancel</v-btn>
      <v-btn text color="error" @click="$emit('submit')">Finish</v-btn>
    </v-card-actions>
  </v-card>
</template>
