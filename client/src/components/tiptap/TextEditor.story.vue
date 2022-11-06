<template>
  <Story>
    <Variant
      title="Single Editor"
      :init-state="initSingleEditorState"
      auto-props-disabled
      :source="disabledSource"
    >
      <template #default="{ state }">
        <text-editor-toolbar
          :editor="state.editor"
          @addImage="selectImage(state)"
        />
        <text-editor v-model="state.text" @editorFocus="state.editor = $event">
        </text-editor>
      </template>
      <template #controls="{ state }">
        <HstTextarea v-model="state.text" title="Text" />
      </template>
    </Variant>

    <Variant
      title="Multi Editor"
      :init-state="initMultiEditorState"
      auto-props-disabled
    >
      <template #default="{ state }">
        <text-editor-toolbar
          :editor="state.editor"
          @addImage="selectImage(state)"
        />
        <text-editor
          v-model="state.text_1"
          @editorFocus="state.editor = $event"
          @editorBlur="(editor: any, event: any) => onBlur(state, editor, event)"
        >
        </text-editor>
        <text-editor
          v-model="state.text_2"
          @editorFocus="state.editor = $event"
          @editorBlur="(editor: any, event: any) => onBlur(state, editor, event)"
        >
        </text-editor>
      </template>
    </Variant>
    <Variant title="Viewer" :init-state="initViewerState">
      <template #default="{ state }">
        <TextViewer v-model="state.text" />
      </template>
      <template #controls="{ state }">
        <HstTextarea v-model="state.text" title="Text" />
      </template>
    </Variant>
  </Story>
</template>
<script lang="ts" setup>
import { Editor } from "@tiptap/vue-3";
import TextEditor from "./TextEditor.vue";
import TextEditorToolbar from "./TextEditorToolbar.vue";
import TextViewer from "./TextViewer.vue";
import "@tiptap/extension-image";
import { ref } from "vue";

const disabledSource = "Disabled. Because this can slow down performance";

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

interface EditorState {
  editor: Editor | null;
}

function initSingleEditorState(): EditorState & { text: string } {
  return {
    text,
    editor: null,
  };
}

function initMultiEditorState(): EditorState & {
  text_1: string;
  text_2: string;
} {
  return {
    text_1: text,
    text_2: text,
    editor: null,
  };
}

function initViewerState() {
  return {
    text,
  };
}

const toolbar = ref<InstanceType<typeof TextEditorToolbar>>();

function onBlur(state: EditorState, editor: Editor, event: FocusEvent) {
  const relatedElement = event.relatedTarget as Element;
  if (relatedElement) {
    if (relatedElement.parentElement == toolbar.value!!.$el) return;
  }

  if (state.editor == editor) state.editor = null;
}

function selectImage(state: EditorState) {
  const src = window.prompt("URL");
  if (src) {
    state.editor!.chain().focus().setImage({ src: src }).run();
  }
}
</script>
