<script setup lang="ts">
import {
  RadioGroupRoot,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemText,
  RadioGroupItemHiddenInput,
} from '@ark-ui/vue';
import SwIcon from '../SwIcon.vue';

export interface SwRadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface Props {
  modelValue: string;
  options: SwRadioOption[];
  variant?: 'default' | 'card';
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), { variant: 'default', disabled: false });
const emit = defineEmits<{ 'update:modelValue': [string | null] }>();
</script>

<template>
  <RadioGroupRoot
    class="sw-radio-group"
    :class="`sw-radio-group--${variant}`"
    :model-value="modelValue"
    :disabled="disabled"
    @value-change="emit('update:modelValue', $event.value)"
  >
    <RadioGroupItem
      v-for="opt in options"
      :key="opt.value"
      :value="opt.value"
      :disabled="opt.disabled"
      class="sw-radio__item"
      :class="`sw-radio__item--${variant}`"
    >
      <RadioGroupItemControl v-if="variant === 'default'" class="sw-radio__control">
        <span class="sw-radio__inner" />
      </RadioGroupItemControl>

      <div class="sw-radio__content">
        <RadioGroupItemText class="sw-radio__label">{{ opt.label }}</RadioGroupItemText>
        <span v-if="opt.description" class="sw-radio__description">{{ opt.description }}</span>
      </div>

      <span v-if="variant === 'card'" class="sw-radio__trailing">
        <SwIcon name="check" :size="14" class="sw-radio__check-icon" />
      </span>

      <RadioGroupItemHiddenInput />
    </RadioGroupItem>
  </RadioGroupRoot>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

/* ---- Group ---- */
.sw-radio-group {
  @apply flex flex-col;
}
.sw-radio-group--default {
  @apply gap-2;
}
.sw-radio-group--card {
  @apply gap-2.5;
}

/* ---- Default item ---- */
.sw-radio__item--default {
  @apply flex items-center gap-2.5 cursor-pointer select-none;
}
.sw-radio__item--default[data-disabled] {
  @apply opacity-50 cursor-not-allowed;
}

.sw-radio__item--default .sw-radio__control {
  @apply flex shrink-0 items-center justify-center
         w-4 h-4 rounded-full border border-border bg-surface
         transition-colors duration-150
         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus;
}
.sw-radio__item--default[data-state='checked'] .sw-radio__control {
  @apply bg-primary border-primary;
}

/* Inner dot — visible only when checked */
.sw-radio__item--default .sw-radio__inner {
  @apply w-1.5 h-1.5 rounded-full bg-text-on-primary opacity-0 transition-opacity duration-150;
}
.sw-radio__item--default[data-state='checked'] .sw-radio__inner {
  @apply opacity-100;
}

.sw-radio__item--default .sw-radio__label {
  @apply text-sm text-text leading-none;
}

/* ---- Card item ---- */
.sw-radio__item--card {
  @apply flex items-center gap-4 px-5 py-4 rounded-xl
         border border-border bg-surface
         cursor-pointer select-none transition-all duration-150
         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus;
}
.sw-radio__item--card[data-state='checked'] {
  @apply border-primary;
  background: color-mix(in srgb, var(--color-primary) 6%, var(--surface));
}
.sw-radio__item--card[data-disabled] {
  @apply opacity-50 cursor-not-allowed;
}

/* Trailing check icon */
.sw-radio__trailing {
  @apply ml-auto flex shrink-0 items-center justify-center
         w-5 h-5 rounded-full bg-primary
         opacity-0 scale-75 transition-all duration-150;
}
.sw-radio__item--card[data-state='checked'] .sw-radio__trailing {
  @apply opacity-100 scale-100;
}
.sw-radio__check-icon {
  @apply text-text-on-primary;
}

/* ---- Shared content ---- */
.sw-radio__content {
  @apply flex flex-col gap-1;
}
.sw-radio__label {
  @apply text-sm text-text;
}
.sw-radio__item--card .sw-radio__label {
  @apply font-semibold leading-none;
}
.sw-radio__description {
  @apply text-xs text-text-muted;
}
</style>
