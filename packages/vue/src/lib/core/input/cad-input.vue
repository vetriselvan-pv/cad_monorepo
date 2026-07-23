<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import '@cad/core'; // Register the web component

withDefaults(
  defineProps<{
    modelValue?: string;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
  }>(),
  {
    modelValue: '',
    placeholder: '',
    type: 'text',
    disabled: false,
  },
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const cadInputRef = ref<HTMLElement | null>(null);

const handleInput = (event: Event) => {
  const customEvent = event as CustomEvent;
  emit('update:modelValue', customEvent.detail.value);
};

onMounted(() => {
  if (cadInputRef.value) {
    cadInputRef.value.addEventListener('cad-input', handleInput);
  }
});

onBeforeUnmount(() => {
  if (cadInputRef.value) {
    cadInputRef.value.removeEventListener('cad-input', handleInput);
  }
});
</script>

<template>
  <cad-input
    ref="cadInputRef"
    :value="modelValue"
    :placeholder="placeholder"
    :type="type"
    :disabled="disabled"
  >
  </cad-input>
</template>
