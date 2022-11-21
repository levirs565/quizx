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
<script lang="ts" setup>

export interface Props {
  icon: string
  disabled?: boolean
  title: string
  active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  active: false
})
</script>
