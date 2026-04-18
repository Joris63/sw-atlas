<script setup lang="ts">
import { computed } from 'vue';
import { FieldRoot, FieldInput } from '@ark-ui/vue';

interface Props {
  modelValue?: string;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), { modelValue: '', size: 'md', disabled: false });
const emit = defineEmits<{ 'update:modelValue': [string] }>();

const inputValue = computed({
  get: () => props.modelValue ?? '',
  set: (v: string) => emit('update:modelValue', v),
});
</script>

<template>
  <FieldRoot :class="['sw-input', `sw-input--${props.size}`]" :disabled="props.disabled">
    <FieldInput v-model="inputValue" class="sw-input__input" :placeholder="props.placeholder" />
  </FieldRoot>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-input {
  @apply flex-1;
}

.sw-input__input {
  @apply w-full px-3 rounded-md
         bg-surface-subtle border border-border text-text
         placeholder:text-text-subtle
         focus:outline-none focus:border-border-focus
         transition-colors duration-150;
}

/* ---- Sizes ---- */
.sw-input--sm .sw-input__input {
  @apply h-8 text-xs px-2;
}

.sw-input--md .sw-input__input {
  @apply h-9 text-sm px-3;
}

.sw-input--lg .sw-input__input {
  @apply h-10 text-base px-3;
}

.sw-input__input:disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>
