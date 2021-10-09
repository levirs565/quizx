<template>
  <div class="modal-card w-auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Create Quiz</p>
    </header>
    <section class="modal-card-body">
      <b-tabs type="is-toggle" v-model="activeTab">
        <b-tab-item label="Blank" value="blank">
          <b-field label="Title">
            <b-input type="text" v-model="title" />
          </b-field>
        </b-tab-item>
        <b-tab-item label="Import JSON" value="json">
          <b-field label="JSON">
            <b-input type="textarea" v-model="json" />
          </b-field>
        </b-tab-item>
      </b-tabs>
    </section>
    <footer class="modal-card-foot">
      <b-button @click="$emit('close')">Cancel</b-button>
      <b-button type="is-primary" @click="submit">Create</b-button>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      json: "",
      activeTab: "blank",
    };
  },
  methods: {
    submit() {
      let quiz;
      if (this.activeTab === "blank") {
        quiz = {
          title: this.title,
        };
      } else if (this.activeTab === "json") {
        try {
          quiz = JSON.parse(this.json);
        } catch (e) {
          this.$buefy.toast.open({
            type: "is-danger",
            message: `Cannot parse JSON: ${e.message}`,
          });
          return;
        }
      }
      this.$emit("create", quiz);
    },
  },
};
</script>
