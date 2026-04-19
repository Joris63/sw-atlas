<script setup lang="ts">
import { computed } from 'vue';
import { FieldRoot, FieldTextarea } from '@ark-ui/vue';

interface Props {
  modelValue?: string;
  placeholder?: string;
  rows?: number;
  size?: 'sm' | 'md' | 'lg';
  resize?: 'none' | 'vertical' | 'both';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  rows: 3,
  size: 'md',
  resize: 'vertical',
  disabled: false,
  placeholder: undefined,
});

const emit = defineEmits<{ 'update:modelValue': [string] }>();

const textareaValue = computed({
  get: () => props.modelValue ?? '',
  set: (v: string) => emit('update:modelValue', v),
});
</script>

<template>
  <FieldRoot :class="['sw-textarea', `sw-textarea--${size}`]" :disabled="disabled">
    <FieldTextarea
      v-model="textareaValue"
      class="sw-textarea__input"
      :placeholder="placeholder"
      :rows="rows"
      :style="{ resize }"
    />
  </FieldRoot>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-textarea {
  @apply flex-1;
}

.sw-textarea__input {
  @apply w-full px-3 py-2 rounded-md
         bg-surface-subtle border border-border text-text
         placeholder:text-text-subtle
         focus:outline-none focus:border-border-focus
         transition-colors duration-150;
}

.sw-textarea--sm .sw-textarea__input {
  @apply text-xs px-2 py-1.5 min-h-8;
}

.sw-textarea--md .sw-textarea__input {
  @apply text-sm px-3 py-2 min-h-9;
}

.sw-textarea--lg .sw-textarea__input {
  @apply text-base px-3 py-2.5 min-h-10;
}

.sw-textarea__input:disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>
