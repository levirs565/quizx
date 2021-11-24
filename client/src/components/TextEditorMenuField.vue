<template>
  <b-field>
    <p class="control" v-for="control in controls" :key="control.icon">
      <b-tooltip :label="control.title">
        <b-button
          :icon-left="control.icon"
          @click="runAction(control.action)"
          v-show="control.show()"
        />
      </b-tooltip>
    </p>
  </b-field>
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
        result.then((res) => res.run())
        return
      }
      result.run();
    },
  },
};
</script>
