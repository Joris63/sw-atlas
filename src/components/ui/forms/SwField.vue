<script setup lang="ts">
import { computed, useId } from 'vue';
import { FieldRoot, FieldHelperText, FieldLabel } from '@ark-ui/vue';
import SwLabel from '@/components/ui/typography/SwLabel.vue';

interface Props {
  label?: string;
  error?: string | string[];
  helpText?: string;
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
}

const props = defineProps<Props>();

const errorId = useId();

const errorList = computed(() => {
  if (!props.error) {
    return [];
  }
  return Array.isArray(props.error) ? props.error.filter(Boolean) : [props.error];
});

const isInvalid = computed(() => props.invalid ?? errorList.value.length > 0);
</script>

<template>
  <FieldRoot
    class="sw-field"
    :invalid="isInvalid"
    :required="required"
    :disabled="disabled"
    :ids="{ errorText: errorId }"
  >
    <FieldLabel v-if="label" as-child>
      <SwLabel :required="required">{{ label }}</SwLabel>
    </FieldLabel>
    <slot />
    <span v-if="errorList.length > 0" :id="errorId" class="sw-field__errors" aria-live="polite">
      <span v-for="err in errorList" :key="err" class="sw-field__error">{{ err }}</span>
    </span>
    <FieldHelperText v-if="helpText" class="sw-field__help">{{ helpText }}</FieldHelperText>
  </FieldRoot>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-field {
  @apply flex flex-col gap-1;
}

.sw-field__errors {
  @apply flex flex-col gap-0.5;
}

.sw-field__error {
  @apply text-xs text-danger;
}

.sw-field__help {
  @apply text-xs text-text-muted;
}
</style>
