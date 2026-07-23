<script setup lang="ts">
import '@cad/core'; // Register the web component

withDefaults(
  defineProps<{
    name?: string;
    expanded?: boolean;
    disabled?: boolean;
  }>(),
  {
    name: '',
    expanded: false,
    disabled: false,
  },
);
</script>

<template>
  <cad-accordion-item :name="name" :expanded="expanded" :disabled="disabled">
    <div slot="heading"><slot name="heading"></slot></div>
    <slot></slot>
  </cad-accordion-item>
</template>
