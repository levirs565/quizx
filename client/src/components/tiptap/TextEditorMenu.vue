<template>
  <floating-menu
    :shouldShow="shouldShow"
    :editor="editor"
    v-if="editor"
    :tippyOptions="tippyOptions"
  >
    <text-editor-menu-field :editor="editor" :controls="controls" />
  </floating-menu>
</template>
<script>
import { FloatingMenu } from "@tiptap/vue-2";
import TextEditorMenuField, { tippyOptions } from "./TextEditorBaseMenu.vue";

export default {
  components: {
    FloatingMenu,
    TextEditorMenuField,
  },
  props: {
    editor: Object,
    selectImageFunction: Function,
  },
  data() {
    return {
      controls: [
        {
          icon: "mdi-table-plus",
          action: (chain) =>
            chain.insertTable({ rows: 3, cols: 3, withHeaderRow: true }),
          show: () => true,
          title: "Add Table",
        },
        {
          icon: "mdi-image-plus",
          action: async (chain) => {
            try {
              return chain.setImage(await this.selectImageFunction());
            } catch (e) {
              return chain;
            }
          },
          show: () => true,
          title: "Add Image",
        },
      ],
      tippyOptions,
    };
  },
  methods: {
    shouldShow({ state }) {
      const { selection } = state;
      const { $anchor, empty: isSelectionEmpty } = selection;
      const isParagraph = $anchor.parent.type.name === "paragraph";
      const isEmptyParagraph =
        $anchor.parent.isTextblock &&
        !$anchor.parent.type.spec.code &&
        !$anchor.parent.childCount;

      if (isSelectionEmpty && isParagraph && isEmptyParagraph) {
        return true;
      }

      return false;
    },
  },
};
</script>
