<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue';
import SwNumberInput from '@/components/ui/forms/SwNumberInput.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue';

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'modelValue',
    label: 'value',
    type: 'number',
    description: 'Controlled value. Bind with v-model.',
    control: 'none',
  },
  {
    name: 'placeholder',
    type: 'string',
    description: 'Placeholder text when empty.',
    control: 'text',
    initialValue: '0',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: 'md',
    description: 'Height and font size of the input.',
    control: 'select',
    options: ['sm', 'md', 'lg'],
  },
  {
    name: 'min',
    type: 'number',
    description: 'Minimum allowed value.',
    control: 'select',
    options: ['0', '1', '10'],
    isNumeric: true,
  },
  {
    name: 'max',
    type: 'number',
    description: 'Maximum allowed value.',
    control: 'select',
    options: ['10', '100', '1000'],
    isNumeric: true,
  },
  {
    name: 'step',
    type: 'number',
    description: 'Amount to increment or decrement per step.',
    control: 'select',
    options: ['0.1', '1', '5', '10'],
    default: '1',
    isNumeric: true,
  },
  {
    name: 'decimals',
    type: 'boolean',
    default: false,
    description: 'Allow decimal values.',
    control: 'toggle',
  },
  {
    name: 'locale',
    type: 'string',
    default: 'nl-NL',
    description: 'BCP 47 locale tag used for number formatting.',
    control: 'select',
    options: ['nl-NL', 'en-US', 'de-DE', 'fr-FR'],
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: false,
    description: 'Disables the input.',
    control: 'toggle',
  },
];
</script>

<template>
  <SwPage
    title="SwNumberInput"
    description="A numeric input with increment and decrement controls. Supports min/max clamping, step size, and optional decimal values."
  >
    <SwPlayground :props-config="playgroundConfig" component-name="SwNumberInput">
      <template #default="{ values }">
        <SwNumberInput
          :placeholder="values.placeholder"
          :size="values.size"
          :min="values.min !== '' ? Number(values.min) : undefined"
          :max="values.max !== '' ? Number(values.max) : undefined"
          :step="values.step !== '' ? Number(values.step) : undefined"
          :decimals="values.decimals"
          :locale="values.locale"
          :disabled="values.disabled"
        />
      </template>
    </SwPlayground>
  </SwPage>
</template>
