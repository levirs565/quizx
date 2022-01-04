<template>
  <v-container class="text-center" fill-height>
    <v-row align-content="center" justify="center">
      <v-col cols="12">
        <h1 class="red--text text-h1">Oops!</h1>
      </v-col>
      <v-col cols="12">
        <h2 class="subtitle">An error occured</h2>
      </v-col>
      <v-col>
        <v-btn color="primary" @click="$emit('reload')">Reload</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
