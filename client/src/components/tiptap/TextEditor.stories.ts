import TextEditor from "./TextEditor.vue";
import TextEditorToolbar from "./TextEditorToolbar.vue";
import TextViewer from "./TextViewer.vue";

export default {
  title: "Text Editor",
};

const text = `
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>

<p>This is <strong>bold</strong> and <i>italic</i> text <math src="x^2+y^2=r^2"></math></p>
<math-block src="x^2+y^2=r^2"></math-block>

<p>This is inline math: <math src="\\sum_{i=0}^n \\frac{a_i}{1+x}"></math></p>

<p>Below is block math.</p>
<math-block src="\\sum_{i=0}^n \\frac{a_i}{1+x}"></math-block>

<p>Below is table.</p>
<table class="table is-bordered">
  <tbody>
    <tr>
      <th colspan="1" rowspan="1">
        <p>No</p>
      </th>
      <th colspan="1" rowspan="1">
        <p>Name</p>
      </th>
      <th colspan="1" rowspan="1">
        <p>Amount</p>
      </th>
    </tr>
    <tr>
      <td colspan="1" rowspan="1">
        <p>1</p>
      </td>
      <td colspan="1" rowspan="1">
        <p>Girindra</p>
      </td>
      <td colspan="1" rowspan="1">
        <p>10</p>
      </td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1">
        <p>2</p>
      </td>
      <td colspan="1" rowspan="1">
        <p>Numin</p>
      </td>
      <td colspan="1" rowspan="1">
        <p>10</p>
      </td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1">
        <p>3</p>
      </td>
      <td colspan="1" rowspan="1">
        <p>Suwiyo</p>
      </td>
      <td colspan="1" rowspan="1">
        <p>10</p>
      </td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1">
        <p>4</p>
      </td>
      <td colspan="1" rowspan="1">
        <p>Ganang</p>
      </td>
      <td colspan="1" rowspan="1">
        <p>10</p>
      </td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1">
        <p>5</p>
      </td>
      <td colspan="1" rowspan="1">
        <p>Hendrik</p>
      </td>
      <td colspan="1" rowspan="1">
        <p>10</p>
      </td>
    </tr>
    <tr>
      <td colspan="2" rowspan="1">
        <p>Total</p>
      </td>
      <td colspan="1" rowspan="1">
        <p>50</p>
      </td>
    </tr>
  </tbody>
</table>
`;

export const editor = () => ({
  components: {
    TextEditor,
    TextEditorToolbar,
  },
  data() {
    return {
      text,
      editor: null,
    };
  },
  methods: {
    selectImage() {
      const src = window.prompt("URL");
      if (src) {
        this.editor.chain().focus().setImage({ src: src }).run();
      }
    },
  },
  template: `
  <div>
    <text-editor-toolbar
      :editor="editor"
      @addImage="selectImage"
    />
    <text-editor 
      v-model="text" 
      @editorFocus="editor = $event">
    </text-editor>
    <pre><code>{{ text }}</code></pre>
  </div>`,
});

export const multiEditor = () => ({
  components: {
    TextEditor,
    TextEditorToolbar,
  },
  data() {
    return {
      text_1: text,
      text_2: text,
      editor: null,
    };
  },
  methods: {
    selectImage() {
      const src = window.prompt("URL");
      if (src) {
        this.editor.chain().focus().setImage({ src: src }).run();
      }
    },
  },
  template: `
  <div>
    <text-editor-toolbar
      :editor="editor"
      @addImage="selectImage"
    />
    <text-editor 
      v-model="text_1" 
      @editorFocus="editor = $event">
    </text-editor>
    <text-editor 
      v-model="text_2" 
      @editorFocus="editor = $event">
    </text-editor>
  </div>`,
});

export const renderer = () => ({
  components: {
    TextViewer,
  },
  data() {
    return {
      text,
    };
  },
  template: `
  <div>
    <text-viewer v-model="text" :editable="false"></text-viewer>
  </div>`,
});
