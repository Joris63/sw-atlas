<script setup lang="ts">
import { computed } from 'vue';
import { FieldTextarea } from '@ark-ui/vue';
import SwField from './SwField.vue';

interface Props {
  modelValue?: string;
  placeholder?: string;
  rows?: number;
  size?: 'sm' | 'md' | 'lg';
  resize?: 'none' | 'vertical' | 'both';
  disabled?: boolean;
  label?: string;
  error?: string | string[];
  helpText?: string;
  invalid?: boolean;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  rows: 3,
  size: 'md',
  resize: 'vertical',
  disabled: false,
  placeholder: undefined,
  label: undefined,
  error: undefined,
  helpText: undefined,
  invalid: undefined,
  required: undefined,
});

const emit = defineEmits<{ 'update:modelValue': [string] }>();

const textareaValue = computed({
  get: () => props.modelValue ?? '',
  set: (v: string) => emit('update:modelValue', v),
});
</script>

<template>
  <SwField
    :label="label"
    :error="error"
    :help-text="helpText"
    :invalid="invalid"
    :required="required"
    :disabled="disabled"
  >
    <FieldTextarea
      v-model="textareaValue"
      :class="['sw-textarea', `sw-textarea--${size}`]"
      :placeholder="placeholder"
      :rows="rows"
      :style="{ resize }"
    />
  </SwField>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-textarea {
  @apply w-full px-3 py-2 rounded-md
         bg-surface-subtle border border-border text-text
         placeholder:text-text-subtle
         focus:outline-none focus:border-border-focus
         transition-colors duration-150;
}

.sw-textarea[aria-invalid='true'] {
  @apply border-danger;
}

.sw-textarea--sm {
  @apply text-xs px-2 py-1.5 min-h-8;
}

.sw-textarea--md {
  @apply text-sm px-3 py-2 min-h-9;
}

.sw-textarea--lg {
  @apply text-base px-3 py-2.5 min-h-10;
}

.sw-textarea:disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>
