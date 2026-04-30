<script setup lang="ts">
import { CheckboxRoot, CheckboxControl, CheckboxHiddenInput, CheckboxLabel } from '@ark-ui/vue';
import SwIcon from '../display/SwIcon.vue';
import SwLabel from '@/components/ui/typography/SwLabel.vue';

interface Props {
  modelValue?: boolean | 'indeterminate';
  label?: string;
  hint?: string;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
  label: undefined,
  hint: undefined,
});
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
      <span v-if="modelValue" class="sw-checkbox__indicator">
        <SwIcon :name="modelValue === 'indeterminate' ? 'minus' : 'check'" :size="11" />
      </span>
    </CheckboxControl>

    <span v-if="label || hint" class="sw-checkbox__text">
      <CheckboxLabel v-if="label" as-child>
        <SwLabel>{{ label }}</SwLabel>
      </CheckboxLabel>
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

.sw-checkbox__hint {
  @apply text-xs text-text-muted;
}
</style>
