<template>
  <div class="modal-card w-auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Add Image</p>
    </header>
    <section class="modal-card-body">
      <b-tabs type="is-toggle" v-model="activeTab">
        <b-tab-item label="Upload" value="upload">
          <b-field
            class="file is-centered is-primary"
            :class="{ 'has-name': !!file }"
          >
            <b-upload v-model="file" class="file-label" accept="image/*">
              <span class="file-cta">
                <b-icon class="file-icon" icon="upload"></b-icon>
                <span class="file-label">Click to upload</span>
              </span>
              <span class="file-name" v-if="file">
                {{ file.name }}
              </span>
            </b-upload>
          </b-field>
        </b-tab-item>
        <b-tab-item label="URL" value="url">
          <b-field label="URL">
            <b-input type="text" v-model="url" />
          </b-field>
        </b-tab-item>
      </b-tabs>
    </section>
    <footer class="modal-card-foot">
      <b-button @click="$parent.cancel('x')">Cancel</b-button>
      <b-button type="is-primary" @click="submit">Add</b-button>
    </footer>
  </div>
</template>
<script>
import { Quiz } from "@/api";

export default {
  props: {
    quizId: String,
  },
  data() {
    return {
      url: "",
      file: null,
      activeTab: "upload",
    };
  },
  methods: {
    async submit() {
      const result = {
        src: null,
      };
      if (this.activeTab === "upload") {
        if (!this.file) return;
        try {
          const uploadResult = await Quiz.upload(this.quizId, this.file);
          result.src = uploadResult.url;
        } catch (e) {
          this.$buefy.toast.open({
            type: "is-danger",
            message: `Cannot upload file: ${e.message}`,
          });
          return;
        }
      } else {
        if (this.url.trim().length == 0) return;
        result.src = this.url;
      }

      this.$emit("imageSelected", result);
      this.$parent.close();
    },
  },
};
</script>
