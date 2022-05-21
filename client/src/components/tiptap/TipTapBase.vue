<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import { MathBlock, MathInline } from "./extensions/Math";
import { CursorTracker } from "./extensions/CursorTracker";

export default {
  components: {
    EditorContent,
  },
  props: {
    value: String,
    hasMenu: {
      type: Boolean,
      default: false,
    },
    selectImageFunction: Function,
  },
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    let editorClass = "text-body-1 text--primary";
    this.editor = new Editor({
      editable: this.editable,
      content: this.value,
      extensions: [
        StarterKit,
        Table,
        TableRow,
        TableHeader,
        TableCell,
        Image,
        Superscript,
        Subscript,
        CursorTracker,
        MathBlock,
        MathInline,
      ],
      editorProps: {
        attributes: {
          class: editorClass,
        },
      },
      onUpdate: () => {
        this.$emit("input", this.editor.getHTML());
      },
      onFocus: ({ editor }) => {
        this.$emit("editorFocus", editor);
      },
      onBlur: ({ editor, event }) => {
        this.$emit("editorBlur", editor, event);
      },
    });
  },
  watch: {
    value(value) {
      if (this.editor.getHTML() === value) return;
      this.editor.commands.setContent(value, false);
    },
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>
<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  margin: 1rem 0;
  --divider: rgba(0, 0, 0, 0.12);
  --code-color: rgba(0, 0, 0, 0.05);
  --active-color: #f5f5f5;

  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  pre {
    background: var(--code-color);
    padding: 0.75rem 1rem;

    code {
      color: inherit;
      padding: 0;
      background-color: transparent !important;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid var(--divider);
  }

  hr {
    border: none;
    border-top: 2px solid var(--divider);
    margin: 2rem 0;
  }
}

/* Table-specific styling */
.ProseMirror {
  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;

    td,
    th {
      min-width: 1em;
      border: thin solid var(--divider);
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
    }

    .selectedCell {
      background: var(--active-color);
    }

    p {
      margin: 0;
    }
  }
}

.tableWrapper {
  overflow-x: auto;
}
</style>
