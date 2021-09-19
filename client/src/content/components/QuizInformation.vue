<template>
  <b-field class="mb-0" grouped>
    <div class="control">
      <b-taglist attached>
        <b-tag type="is-primary">
          <b-icon size="is-small" icon="account" />
        </b-tag>
        <b-tag>
          {{ userId }}
        </b-tag>
      </b-taglist>
    </div>

    <div class="control">
      <b-taglist attached>
        <b-tag type="is-primary">
          <b-icon size="is-small" icon="help-box" />
        </b-tag>
        <b-tag>
          {{ questionCount }}
        </b-tag>
      </b-taglist>
    </div>
  </b-field>
</template>
<script>
export default {
  props: {
    userId: String,
    questionCount: Number,
  },
};
</script>
<style scoped></style>
