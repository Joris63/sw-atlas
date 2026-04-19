<script setup lang="ts">
import { computed } from 'vue';
import {
  NumberInputRoot,
  NumberInputControl,
  NumberInputInput,
  NumberInputIncrementTrigger,
  NumberInputDecrementTrigger,
} from '@ark-ui/vue';
import SwIcon from '@/components/ui/SwIcon.vue';

interface Props {
  modelValue?: number | string;
  min?: number;
  max?: number;
  step?: number;
  decimals?: boolean;
  placeholder?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  locale?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  decimals: false,
  disabled: false,
  locale: 'nl-NL',
});

const emit = defineEmits<{ 'update:modelValue': [number | undefined] }>();

const formatOptions = computed(() =>
  props.decimals
    ? { minimumFractionDigits: 0, maximumFractionDigits: 2 }
    : { maximumFractionDigits: 0 },
);

const effectiveStep = computed(() => {
  if (props.step !== undefined) {
    return props.step;
  }
  return props.decimals ? 0.1 : 1;
});

function onValueChange(details: { value: string; valueAsNumber: number }) {
  emit('update:modelValue', isNaN(details.valueAsNumber) ? undefined : details.valueAsNumber);
}
</script>

<template>
  <NumberInputRoot
    :class="['sw-number-input', `sw-number-input--${size}`]"
    :value="modelValue !== undefined ? String(modelValue) : ''"
    :min="min"
    :max="max"
    :step="effectiveStep"
    :format-options="formatOptions"
    :disabled="disabled"
    :locale="locale"
    clamp-value-on-blur
    @value-change="onValueChange"
  >
    <NumberInputControl class="sw-number-input__control">
      <NumberInputInput class="sw-number-input__input" :placeholder="placeholder" />
      <div class="sw-number-input__spinners">
        <NumberInputIncrementTrigger class="sw-number-input__spinner-btn">
          <SwIcon name="chevron-up" :size="12" />
        </NumberInputIncrementTrigger>
        <NumberInputDecrementTrigger class="sw-number-input__spinner-btn">
          <SwIcon name="chevron-down" :size="12" />
        </NumberInputDecrementTrigger>
      </div>
    </NumberInputControl>
  </NumberInputRoot>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-number-input {
  @apply flex-1;
}

.sw-number-input__control {
  @apply flex items-center w-full
         bg-surface-subtle border border-border rounded-md
         transition-colors duration-150
         focus-within:border-border-focus;
}

.sw-number-input__input {
  @apply flex-1 min-w-0 bg-transparent text-text
         placeholder:text-text-subtle
         focus:outline-none;
}

.sw-number-input__spinners {
  @apply flex flex-col shrink-0 border-l border-border self-stretch;
}

.sw-number-input__spinner-btn {
  @apply flex items-center justify-center flex-1 px-1.5
         text-text-muted cursor-pointer select-none
         transition-colors duration-150
         hover:bg-surface-hover hover:text-text
         disabled:opacity-40 disabled:cursor-not-allowed;
}

.sw-number-input__spinner-btn:first-child {
  @apply border-b border-border rounded-tr-md;
}

.sw-number-input__spinner-btn:last-child {
  @apply rounded-br-md;
}

/* ---- Sizes ---- */
.sw-number-input--sm .sw-number-input__control {
  @apply h-8;
}

.sw-number-input--sm .sw-number-input__input {
  @apply text-xs px-2;
}

.sw-number-input--md .sw-number-input__control {
  @apply h-9;
}

.sw-number-input--md .sw-number-input__input {
  @apply text-sm px-3;
}

.sw-number-input--lg .sw-number-input__control {
  @apply h-10;
}

.sw-number-input--lg .sw-number-input__input {
  @apply text-base px-3;
}

.sw-number-input__control[data-disabled] {
  @apply opacity-50 cursor-not-allowed;
}
</style>
