import MarkdownEditor from "./MarkdownEditor";
import MarkdownViewer from "./MarkdownViewer";

export default {
  title: "Markdown",
};

export const markdownEditor = () => ({
  components: {
    MarkdownEditor,
  },
  data() {
    return {
      text: "*italic text*",
    };
  },
  template: `
  <div>
    <markdown-editor v-model="text"></markdown-editor>
    <p>{{ text }}</p>
  </div>`,
});

export const markdownViewer = () => ({
  components: {
    MarkdownViewer
  },
  data() {
    return {
      text: "*italic text*"
    }
  },
  template: `
    <markdown-viewer :value="text"/>
  `
})