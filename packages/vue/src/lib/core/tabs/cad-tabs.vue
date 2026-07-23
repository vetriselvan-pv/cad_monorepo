<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import '@cad/core'; // Register the web component

defineProps<{
  orientation?: 'horizontal' | 'vertical';
  modelValue?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const cadTabsRef = ref<HTMLElement | null>(null);

const handleChange = (event: Event) => {
  const customEvent = event as CustomEvent<{ name: string }>;
  emit('update:modelValue', customEvent.detail.name);
};

onMounted(() => {
  if (cadTabsRef.value) {
    cadTabsRef.value.addEventListener('cad-tabs-change', handleChange);
  }
});

onBeforeUnmount(() => {
  if (cadTabsRef.value) {
    cadTabsRef.value.removeEventListener('cad-tabs-change', handleChange);
  }
});
</script>

<template>
  <cad-tabs
    ref="cadTabsRef"
    :orientation="orientation"
    :active-tab="modelValue"
  >
    <slot></slot>
  </cad-tabs>
</template>
