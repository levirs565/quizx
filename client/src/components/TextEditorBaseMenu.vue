<template>
  <v-sheet :elevation="1">
    <v-tooltip v-for="control in controls" :key="control.icon" top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click="runAction(control.action)"
          v-show="control.show()"
          v-bind="attrs"
          v-on="on"
          tile
          depressed
        >
          <v-icon>{{ control.icon }}</v-icon>
        </v-btn>
      </template>
      <span>{{ control.title }}</span>
    </v-tooltip>
  </v-sheet>
</template>
<script>
export default {
  props: {
    controls: Array,
    editor: Object,
  },
  methods: {
    runAction(action) {
      const chain = this.editor.chain().focus();
      const result = action(chain);
      if (result instanceof Promise) {
        result.then((res) => res.run());
        return;
      }
      result.run();
    },
  },
};

export const tippyOptions = {
  zIndex: 1,
};
</script>
