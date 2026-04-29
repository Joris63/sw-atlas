<script setup lang="ts">
import { ref } from 'vue';
import { z } from 'zod';
import type { ZodType } from 'zod';
import { useValidation } from '@/composables/useValidation';
import SwInputText from '@/components/ui/forms/SwInputText.vue';
import SwButton from '@/components/ui/buttons/SwButton.vue';

const props = defineProps<{
  name: string;
  label: string;
  placeholder?: string;
  fieldSchema: ZodType<string>;
}>();

const value = ref('');
const schema = z.object({ value: props.fieldSchema });

const { errors, isValid, validate, reset } = useValidation({
  name: props.name,
  schema,
  data: () => ({ value: value.value }),
});
</script>

<template>
  <div class="sw-validation-nested-section">
    <div class="sw-validation-nested-section__header">
      <code class="sw-validation-nested-section__name">{{ name }}</code>
      <span
        :class="[
          'sw-validation-nested-section__indicator',
          isValid
            ? 'sw-validation-nested-section__indicator--valid'
            : 'sw-validation-nested-section__indicator--invalid',
        ]"
      >
        {{ isValid ? 'valid' : 'invalid' }}
      </span>
    </div>
    <SwInputText v-model="value" :label="label" :placeholder="placeholder" :error="errors[0]" />
    <div class="sw-validation-nested-section__footer">
      <SwButton label="Validate" size="sm" variant="outline" @click="validate" />
      <SwButton
        label="Reset"
        size="sm"
        variant="ghost"
        @click="
          () => {
            value = '';
            reset();
          }
        "
      />
    </div>
  </div>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-validation-nested-section {
  @apply flex flex-col gap-3 p-4 rounded-xl border border-border bg-surface;
}

.sw-validation-nested-section__header {
  @apply flex items-center justify-between;
}

.sw-validation-nested-section__name {
  @apply text-[11px] font-mono font-medium text-text-muted bg-surface-hover px-2 py-0.5 rounded-md;
}

.sw-validation-nested-section__indicator {
  @apply text-[11px] font-semibold px-2 py-0.5 rounded-full;
}

.sw-validation-nested-section__indicator--valid {
  @apply text-success;
  background: color-mix(in srgb, var(--color-success) 12%, transparent);
}

.sw-validation-nested-section__indicator--invalid {
  @apply text-danger;
  background: color-mix(in srgb, var(--color-danger) 12%, transparent);
}

.sw-validation-nested-section__footer {
  @apply flex justify-end gap-2;
}
</style>
