<template>
  <floating-menu :editor="editor" v-if="editor">
    <p class="control">
      <b-button
        icon-left="table-plus"
        @click="
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        "
      />
    </p>
  </floating-menu>
</template>
<script>
import { FloatingMenu } from "@tiptap/vue-2";

export default {
  components: {
    FloatingMenu,
  },
  props: {
    editor: Object,
  },
};
</script>
