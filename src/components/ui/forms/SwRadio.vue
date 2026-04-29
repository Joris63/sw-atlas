<script setup lang="ts">
import { computed, onMounted } from 'vue';
import {
  RadioGroupRoot,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemText,
  RadioGroupItemHiddenInput,
} from '@ark-ui/vue';
import SwField from './SwField.vue';

export interface SwRadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface Props {
  modelValue?: string;
  options: SwRadioOption[];
  disabled?: boolean;
  label?: string;
  error?: string | string[];
  helpText?: string;
  invalid?: boolean;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  disabled: false,
  label: undefined,
  error: undefined,
  helpText: undefined,
  invalid: undefined,
  required: undefined,
});

const emit = defineEmits<{ 'update:modelValue': [string | null] }>();

const isInvalid = computed(() => {
  if (props.invalid !== undefined) return props.invalid;
  if (!props.error) return false;
  return Array.isArray(props.error) ? props.error.length > 0 : props.error.length > 0;
});

onMounted(() => {
  if (!props.modelValue && props.options.length > 0) {
    const first = props.options.find((o) => !o.disabled);
    if (first) {
      emit('update:modelValue', first.value);
    }
  }
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
    <RadioGroupRoot
      class="sw-radio-group"
      :model-value="modelValue"
      :disabled="disabled"
      :data-invalid="isInvalid ? '' : undefined"
      @value-change="emit('update:modelValue', $event.value)"
    >
      <RadioGroupItem
        v-for="opt in options"
        :key="opt.value"
        :value="opt.value"
        :disabled="opt.disabled"
        class="sw-radio__item"
      >
        <RadioGroupItemControl class="sw-radio__control">
          <span class="sw-radio__inner" />
        </RadioGroupItemControl>

        <RadioGroupItemText class="sw-radio__label">{{ opt.label }}</RadioGroupItemText>

        <RadioGroupItemHiddenInput />
      </RadioGroupItem>
    </RadioGroupRoot>
  </SwField>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-radio-group {
  @apply flex flex-col gap-2;
}

.sw-radio__item {
  @apply flex items-center gap-2.5 cursor-pointer select-none;
}

.sw-radio__item[data-disabled] {
  @apply opacity-50 cursor-not-allowed;
}

.sw-radio__control {
  @apply flex shrink-0 items-center justify-center
         w-4 h-4 rounded-full border border-border bg-surface
         transition-colors duration-150
         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus;
}

.sw-radio__item[data-state='checked'] .sw-radio__control {
  @apply bg-primary border-primary;
}

.sw-radio__inner {
  @apply w-1.5 h-1.5 rounded-full bg-text-on-primary opacity-0 transition-opacity duration-150;
}

.sw-radio__item[data-state='checked'] .sw-radio__inner {
  @apply opacity-100;
}

.sw-radio__label {
  @apply text-sm text-text leading-none;
}

.sw-radio-group[data-invalid] .sw-radio__control {
  @apply border-danger;
}
</style>
