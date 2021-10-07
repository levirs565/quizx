import TextEditor from "./TextEditor";

export default {
  title: "Text Editor",
};

const text = `
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h5>Heading 6</h5>

<p>This is <strong>bold</strong> and <i>italic</i> text <math src="x^2+y^2=r^2"></math></p>
<math-block src="x^2+y^2=r^2"></math-block>

<p>This is inline math: <math src="\\sum_{i=0}^n \\frac{a_i}{1+x}"></math></p>

<p>Below is block math.</p>
<math-block src="\\sum_{i=0}^n \\frac{a_i}{1+x}"></math-block>
`;

export const editor = () => ({
  components: {
    TextEditor,
  },
  data() {
    return {
      text,
    };
  },
  template: `
  <div>
    <text-editor v-model="text"></text-editor>
    <pre><code>{{ text }}</code></pre>
  </div>`,
});

export const renderer = () => ({
  components: {
    TextEditor,
  },
  data() {
    return {
      text,
    };
  },
  template: `
  <div>
    <text-editor v-model="text" :editable="false"></text-editor>
  </div>`,
});
