<template>
  <v-dialog :value="value" @input="$emit('input', $event)" max-width="350px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mt-4" color="error" v-on="on" v-bind="attrs">
        Finish
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Finish Game?</v-card-title>
      <v-card-text>Make sure all questions are answered correctly.</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="$emit('input', false)">Cancel</v-btn>
        <v-btn text color="error" @click="$emit('submit')">Finish</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    value: Boolean
  }
}
</script>
