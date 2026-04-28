<script setup lang="ts">
import { useValidation } from '@/composables/useValidation';
import { required, email, pattern } from '@/validators/validators';
import ValidationNestedSection from './ValidationNestedSection.vue';
import SwButton from '@/components/ui/buttons/SwButton.vue';

const { isValid, isDirty, validateAll, reset } = useValidation();
</script>

<template>
  <div class="sw-validation-nested-demo">
    <div class="sw-validation-nested-demo__sections">
      <ValidationNestedSection
        name="firstName"
        label="First name"
        placeholder="Enter first name"
        :field-schema="required('First name is required')"
      />
      <ValidationNestedSection
        name="email"
        label="Email address"
        placeholder="Enter email"
        :field-schema="email('Must be a valid email address')"
      />
      <ValidationNestedSection
        name="postalCode"
        label="Postal code"
        placeholder="e.g. 1234AB"
        :field-schema="pattern(/^\d{4}[A-Z]{2}$/, 'Invalid postal code (e.g. 1234AB)')"
      />
    </div>

    <div class="sw-validation-nested-demo__footer">
      <div class="sw-validation-nested-demo__state">
        <code class="sw-validation-nested-demo__state-key">parent.isValid</code>
        <span
          :class="[
            'sw-validation-nested-demo__indicator',
            isValid
              ? 'sw-validation-nested-demo__indicator--valid'
              : 'sw-validation-nested-demo__indicator--invalid',
          ]"
        >
          {{ String(isValid) }}
        </span>
        <code class="sw-validation-nested-demo__state-key">parent.isDirty</code>
        <span
          :class="[
            'sw-validation-nested-demo__indicator',
            isDirty
              ? 'sw-validation-nested-demo__indicator--active'
              : 'sw-validation-nested-demo__indicator--inactive',
          ]"
        >
          {{ String(isDirty) }}
        </span>
      </div>
      <div class="sw-validation-nested-demo__actions">
        <SwButton label="Validate all" size="sm" @click="validateAll" />
        <SwButton label="Reset" size="sm" variant="outline" @click="reset" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-validation-nested-demo {
  @apply flex flex-col gap-4;
}

.sw-validation-nested-demo__sections {
  @apply flex flex-col gap-3;
}

.sw-validation-nested-demo__footer {
  @apply flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border;
}

.sw-validation-nested-demo__state {
  @apply flex items-center gap-2 flex-wrap;
}

.sw-validation-nested-demo__state-key {
  @apply text-[11px] font-mono font-medium text-text-subtle bg-surface-hover px-2 py-0.5 rounded-md;
}

.sw-validation-nested-demo__indicator {
  @apply text-[11px] font-semibold px-2 py-0.5 rounded-full;
}

.sw-validation-nested-demo__indicator--valid {
  @apply text-success;
  background: color-mix(in srgb, var(--color-success) 12%, transparent);
}

.sw-validation-nested-demo__indicator--invalid {
  @apply text-danger;
  background: color-mix(in srgb, var(--color-danger) 12%, transparent);
}

.sw-validation-nested-demo__indicator--active {
  @apply text-primary;
  background: color-mix(in srgb, var(--color-primary) 10%, transparent);
}

.sw-validation-nested-demo__indicator--inactive {
  @apply text-text-muted bg-surface-hover;
}

.sw-validation-nested-demo__actions {
  @apply flex items-center gap-2;
}
</style>
