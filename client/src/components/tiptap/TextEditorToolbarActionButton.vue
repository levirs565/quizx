<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ props }">
      <v-btn
        @click="$emit('click', $event)"
        v-bind="props"
        icon
        :color="active ? 'primary' : ''"
        :disabled="disabled"
        class="mx-2 my-1"
      >
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>
    <span>{{ title }}</span>
  </v-tooltip>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    icon: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    title: String,
    active: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
