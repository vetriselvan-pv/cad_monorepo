<script setup lang="ts">
import '@cad/core'; // Register the web component

withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
  }>(),
  {
    variant: 'primary',
    disabled: false,
  },
);
</script>

<template>
  <cad-button :variant="variant" :disabled="disabled ? '' : undefined">
    <slot></slot>
  </cad-button>
</template>
