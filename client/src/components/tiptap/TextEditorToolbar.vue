<template>
  <v-dialog
    v-slot:default="{ isActive }"
    v-model="isSelectImageShow"
    max-width="500px"
  >
    <dialog-select-image
      @close="isActive.value = false"
      @submit="editor!.chain().focus().setImage($event).run()"
    />
  </v-dialog>
  <v-tabs v-model="tab" density="compact" class="mb-2">
    <v-tab>Home</v-tab>
    <v-tab>Insert</v-tab>
    <v-tab>Table</v-tab>
  </v-tabs>
  <v-window v-model="tab">
    <v-window-item>
      <v-slide-group show-arrows>
        <v-select
          v-model="blockType"
          :items="blockTypeItems"
          item-value="value"
          item-title="title"
          density="compact"
          style="min-width: 150px"
          hide-details
          :disabled="isToolbarDisabled"
        />
        <t-button
          v-for="button in formatsButtons"
          :active="activeMarks[button.value]"
          :icon="button.icon"
          @click="button.click"
          :disabled="isToolbarDisabled"
        />
      </v-slide-group>
    </v-window-item>
    <v-window-item>
      <v-slide-group show-arrows>
        <t-button
          v-for="button in insertButtons"
          :icon="button.icon"
          :text="button.text"
          @click="button.click"
          :disabled="isToolbarDisabled"
        />
      </v-slide-group>
    </v-window-item>
    <v-window-item>
      <v-slide-group show-arrows>
        <t-button
          :disabled="isTableDisabled"
          v-for="button in tableButtons"
          :icon="button.icon"
          :text="button.text"
          :menu="button.menu"
          @click="button.click"
          @menu-click="button.menuClick"
        />
      </v-slide-group>
    </v-window-item>
  </v-window>
</template>
<script lang="ts" setup>
import { Editor } from "@tiptap/vue-3";
import DialogSelectImage from "@/dialog/DialogSelectImage.vue";
import TButton from "./TextEditorToolbarButton.vue";
import "@tiptap/starter-kit";
import "@tiptap/extension-superscript";
import "@tiptap/extension-subscript";
import "@tiptap/extension-table";
import "./extensions/Math";
import { computed, ref } from "vue";
import { Level } from "@tiptap/extension-heading";

export interface Props {
  editor?: Editor;
  stickyTop?: string;
}

const props = withDefaults(defineProps<Props>(), {
  stickyTop: "0",
});

const tab = ref(0);
const isSelectImageShow = ref(false);
const isToolbarDisabled = computed(() => !props.editor);

const applyHeading = (level: Level) =>
  props.editor!.chain().focus().toggleHeading({ level }).run();

const blockTypeItems = [
  {
    value: "p",
    title: "Paragraft",
    apply: () => props.editor!.chain().focus().setParagraph().run(),
  },
  {
    value: "h1",
    title: "Heading 1",
    apply: () => applyHeading(1),
  },
  {
    value: "h2",
    title: "Heading 2",
    apply: () => applyHeading(2),
  },
  {
    value: "h3",
    title: "Heading 3",
    apply: () => applyHeading(3),
  },
  {
    value: "h4",
    title: "Heading 4",
    apply: () => applyHeading(4),
  },
  {
    value: "h5",
    title: "Heading 5",
    apply: () => applyHeading(5),
  },
  {
    value: "h6",
    title: "Heading 6",
    apply: () => applyHeading(6),
  },
  {
    value: "cb",
    title: "Code Block",
    apply: () => props.editor!.chain().focus().toggleCodeBlock().run(),
  },
];

const blockType = computed({
  get: () => {
    if (props.editor?.isActive("paragraph")) return "p";

    const heading = props.editor?.getAttributes("heading");
    if (heading?.level) return `h${heading.level}`;
    if (props.editor?.isActive("codeBlock")) return "cb";

    if (props.editor?.isActive("mathBlock")) return "Math Block";
    return "Unknown";
  },
  set: (newType) => {
    blockTypeItems.find((v) => v.value == newType)?.apply();
  },
});

enum Formats {
  BOLD,
  ITALIC,
  STRIKE,
  CODE,
  SUP,
  SUB,
  BULLET_LIST,
  ORDERED_LIST,
}

const formatsButtons = [
  {
    icon: "mdi-format-bold",
    value: Formats.BOLD,
    click: () => props.editor!.chain().focus().toggleBold().run(),
  },
  {
    icon: "mdi-format-italic",
    value: Formats.ITALIC,
    click: () => props.editor!.chain().focus().toggleItalic().run(),
  },
  {
    icon: "mdi-format-strikethrough",
    value: Formats.STRIKE,
    click: () => props.editor!.chain().focus().toggleStrike().run(),
  },
  {
    icon: "mdi-code-tags",
    value: Formats.CODE,
    click: () => props.editor!.chain().focus().toggleCode().run(),
  },
  {
    icon: "mdi-format-superscript",
    value: Formats.SUP,
    click: () => props.editor!.chain().focus().toggleSuperscript().run(),
  },
  {
    icon: "mdi-format-subscript",
    value: Formats.SUB,
    click: () => props.editor!.chain().focus().toggleSubscript().run(),
  },
  {
    icon: "mdi-format-list-bulleted",
    value: Formats.BULLET_LIST,
    click: () => props.editor!.chain().focus().toggleBulletList().run(),
  },
  {
    icon: "mdi-format-list-numbered",
    value: Formats.ORDERED_LIST,
    click: () => props.editor!.chain().focus().toggleOrderedList().run(),
  },
];

const activeMarks = computed(() => {
  const actives: Record<Formats, boolean> = {
    [Formats.BOLD]: props.editor?.isActive("bold") ?? false,
    [Formats.ITALIC]: props.editor?.isActive("italic") ?? false,
    [Formats.STRIKE]: props.editor?.isActive("strike") ?? false,
    [Formats.CODE]: props.editor?.isActive("code") ?? false,
    [Formats.SUP]: props.editor?.isActive("superscript") ?? false,
    [Formats.SUB]: props.editor?.isActive("subscript") ?? false,
    [Formats.BULLET_LIST]: props.editor?.isActive("bulletList") ?? false,
    [Formats.ORDERED_LIST]: props.editor?.isActive("orderedList") ?? false,
  };
  return actives;
});

const insertButtons = [
  {
    icon: "mdi-math-integral",
    text: "Inline Math",
    click: () => props.editor!.chain().focus().addMathInline().run(),
  },
  {
    icon: "mdi-math-integral-box",
    text: "Math Block",
    click: () => props.editor!.chain().focus().addMathBlock().run(),
  },
  {
    icon: "mdi-code-not-equal-variant",
    text: "Code Block",
    click: () =>
      props
        .editor!.chain()
        .focus()
        .enter()
        .enter()
        .selectTextblockStart()
        .selectNodeBackward()
        .toggleCodeBlock()
        .run(),
  },
  {
    icon: "mdi-table-plus",
    text: "Table",
    click: () =>
      props
        .editor!.chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run(),
  },
  {
    icon: "mdi-image-plus",
    text: "Image",
    click: () => {
      isSelectImageShow.value = true;
    },
  },
];

const isTableDisabled = computed(() => !props.editor?.isActive("table"));

const tableButtons = [
  {
    icon: "mdi-table-row-plus-before",
    menu: ["Add Row Before", "Add Row After"],
    menuClick: (index: number) => {
      if (index == 0) props.editor!.chain().focus().addRowBefore().run();
      else if (index == 1) props.editor!.chain().focus().addRowAfter().run();
    },
  },
  {
    icon: "mdi-table-column-plus-before",
    menu: ["Add Column Before", "Add Column After"],
    menuClick: (index: number) => {
      if (index == 0) props.editor!.chain().focus().addColumnBefore().run();
      else if (index == 1) props.editor!.chain().focus().addColumnAfter().run();
    },
  },
  {
    icon: "mdi-table-row-remove",
    click: () => props.editor!.chain().focus().deleteRow().run(),
  },
  {
    icon: "mdi-table-column-remove",
    click: () => props.editor!.chain().focus().deleteColumn().run(),
  },
  {
    text: "Toggle Header",
    menu: ["Cell", "Row", "Column"],
    menuClick: (index: number) => {
      if (index == 0) props.editor!.chain().focus().toggleHeaderCell().run();
      else if (index == 1)
        props.editor!.chain().focus().toggleHeaderRow().run();
      else if (index == 2)
        props.editor!.chain().focus().toggleHeaderColumn().run();
    },
  },
  {
    text: "Merge Cells",
    icon: "mdi-table-merge-cells",
    click: () => props.editor!.chain().focus().mergeCells().run(),
  },
  {
    text: "Split Cell",
    icon: "mdi-table-split-cell",
    click: () => props.editor!.chain().focus().splitCell().run(),
  },
];
</script>
<style scoped>
.text-editor-toolbar {
  position: sticky;
  z-index: 1;
}
</style>
