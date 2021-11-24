<template>
  <floating-menu :editor="editor" v-if="editor">
    <text-editor-menu-field :editor="editor" :controls="controls" />
  </floating-menu>
</template>
<script>
import { FloatingMenu } from "@tiptap/vue-2";
import TextEditorMenuField from "./TextEditorMenuField.vue";

export default {
  components: {
    FloatingMenu,
    TextEditorMenuField,
  },
  props: {
    editor: Object,
  },
  data() {
    return {
      controls: [
        {
          icon: "table-plus",
          action: (chain) =>
            chain.insertTable({ rows: 3, cols: 3, withHeaderRow: true }),
          show: () => true,
          title: "Add Table",
        },
      ],
    };
  },
};
</script>
