<script setup lang="ts">
import '@cad/core'; // Register the web component

withDefaults(
  defineProps<{
    panel?: string;
    disabled?: boolean;
  }>(),
  {
    panel: '',
    disabled: false,
  },
);
</script>

<template>
  <cad-tab :panel="panel" :disabled="disabled ? '' : undefined">
    <slot></slot>
  </cad-tab>
</template>
