<template>
  <v-card>
    <v-card-title>Finish Game?</v-card-title>
    <v-card-text>Make sure all questions are answered correctly.</v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn variant="text" @click="$emit('close')">Cancel</v-btn>
      <v-btn variant="text" color="error" @click="$emit('submit')"
        >Finish</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
