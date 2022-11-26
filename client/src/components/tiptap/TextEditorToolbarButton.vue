<template>
  <v-btn :icon="undefined" height="40px" :rounded="0" flat size="small">
    <v-icon v-if="icon" :icon="icon" :start="text ? true : false" />
    {{ text }}
    <v-icon v-if="menu" icon="mdi-menu-down" end />
    <v-menu v-if="menu" activator="parent">
      <v-list :density="'compact'">
        <v-list-item
          v-for="(item, index) in menu"
          :key="index"
          :value="index"
          @click="emit('menuClick', index)"
          >{{ item }}</v-list-item
        >
      </v-list>
    </v-menu>
  </v-btn>
</template>
<script lang="ts" setup>
export interface Props {
  menu?: string[];
  icon?: string;
  text?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "menuClick", itemIndex: number): void;
}>();
</script>
