<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        @click="$emit('click')"
        v-bind="attrs"
        v-on="on"
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
<script>
export default {
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
};
</script>
