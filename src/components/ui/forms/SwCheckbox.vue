<script setup lang="ts">
import { CheckboxRoot, CheckboxControl, CheckboxIndicator, CheckboxHiddenInput } from '@ark-ui/vue';
import SwIcon from '../SwIcon.vue';

interface Props {
  modelValue?: boolean | 'indeterminate';
  label?: string;
  hint?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), { modelValue: false, disabled: false });
const emit = defineEmits<{ 'update:modelValue': [boolean | 'indeterminate'] }>();
</script>

<template>
  <CheckboxRoot
    class="sw-checkbox"
    :checked="modelValue"
    :disabled="disabled"
    @checked-change="emit('update:modelValue', $event.checked)"
  >
    <CheckboxControl class="sw-checkbox__control">
      <CheckboxIndicator class="sw-checkbox__indicator">
        <SwIcon :name="modelValue === 'indeterminate' ? 'minus' : 'check'" :size="11" />
      </CheckboxIndicator>
    </CheckboxControl>

    <span v-if="label || hint" class="sw-checkbox__text">
      <span v-if="label" class="sw-checkbox__label">{{ label }}</span>
      <span v-if="hint" class="sw-checkbox__hint">{{ hint }}</span>
    </span>

    <CheckboxHiddenInput />
  </CheckboxRoot>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-checkbox {
  @apply inline-flex items-center gap-2.5 cursor-pointer select-none;
}

.sw-checkbox[data-disabled] {
  @apply opacity-50 cursor-not-allowed;
}

.sw-checkbox__control {
  @apply flex shrink-0 items-center justify-center
         w-4 h-4 rounded-sm border border-border bg-surface
         transition-colors duration-150
         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus;
}

.sw-checkbox__control[data-state='checked'],
.sw-checkbox__control[data-state='indeterminate'] {
  @apply bg-primary border-primary;
}

.sw-checkbox__indicator {
  @apply text-text-on-primary flex items-center justify-center leading-none;
}

.sw-checkbox__text {
  @apply flex items-baseline gap-1.5;
}

.sw-checkbox__label {
  @apply text-sm text-text leading-none;
}

.sw-checkbox__hint {
  @apply text-xs text-text-muted;
}
</style>
