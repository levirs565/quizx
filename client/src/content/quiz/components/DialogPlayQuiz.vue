<template>
  <div class="modal-card w-auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Play Game</p>
    </header>
    <section class="modal-card-body">
      <b-field>
        <b-switch v-model="preference.isInteractive">Interactive Game</b-switch>
      </b-field>
      <b-field>
        <b-switch v-model="preference.shuffleQuestions"
          >Shuffle Questions</b-switch
        >
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <b-button @click="$emit('close')">Cancel</b-button>
      <b-button type="is-primary" @click="submit">Play Now</b-button>
    </footer>
  </div>
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
