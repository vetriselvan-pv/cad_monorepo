<script setup lang="ts">
import '@cad/core'; // Register the web component

withDefaults(
  defineProps<{
    name?: string;
  }>(),
  {
    name: '',
  },
);
</script>

<template>
  <cad-tab-panel :name="name">
    <slot></slot>
  </cad-tab-panel>
</template>
