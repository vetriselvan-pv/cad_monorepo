<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import '@cad/core'; // Register the web component

withDefaults(
  defineProps<{
    multiple?: boolean;
    headingLevel?: number;
  }>(),
  {
    multiple: false,
    headingLevel: 3,
  },
);

const emit = defineEmits<{
  (e: 'item-toggle', name: string, expanded: boolean): void;
}>();

const cadAccordionRef = ref<HTMLElement | null>(null);

const handleChange = (event: Event) => {
  const customEvent = event as CustomEvent<{ name: string; expanded: boolean }>;
  emit('item-toggle', customEvent.detail.name, customEvent.detail.expanded);
};

onMounted(() => {
  if (cadAccordionRef.value) {
    cadAccordionRef.value.addEventListener('cad-accordion-change', handleChange);
  }
});

onBeforeUnmount(() => {
  if (cadAccordionRef.value) {
    cadAccordionRef.value.removeEventListener('cad-accordion-change', handleChange);
  }
});
</script>

<template>
  <cad-accordion
    ref="cadAccordionRef"
    :multiple="multiple"
    :heading-level="headingLevel"
  >
    <slot></slot>
  </cad-accordion>
</template>
