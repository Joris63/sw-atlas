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
    category: 'appearance',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: 'md',
    description: 'Height and font size of the input.',
    control: 'select',
    options: ['sm', 'md', 'lg'],
    category: 'appearance',
  },
  {
    name: 'min',
    type: 'number',
    description: 'Minimum allowed value.',
    control: 'select',
    options: ['0', '1', '10'],
    isNumeric: true,
    category: 'validation',
  },
  {
    name: 'max',
    type: 'number',
    description: 'Maximum allowed value.',
    control: 'select',
    options: ['10', '100', '1000'],
    isNumeric: true,
    category: 'validation',
  },
  {
    name: 'step',
    type: 'number',
    description: 'Amount to increment or decrement per step.',
    control: 'select',
    options: ['0.1', '1', '5', '10'],
    default: '1',
    isNumeric: true,
    category: 'validation',
  },
  {
    name: 'decimals',
    type: 'boolean',
    default: false,
    description: 'Allow decimal values.',
    control: 'toggle',
    category: 'advanced',
  },
  {
    name: 'locale',
    type: 'string',
    default: 'nl-NL',
    description: 'BCP 47 locale tag used for number formatting.',
    control: 'select',
    options: ['nl-NL', 'en-US', 'de-DE', 'fr-FR'],
    category: 'advanced',
  },
  {
    name: 'label',
    type: 'string',
    default: '',
    description: 'Label text rendered above the input.',
    control: 'text',
    initialValue: 'Quantity',
    category: 'field',
  },
  {
    name: 'helpText',
    type: 'string',
    default: '',
    description: 'Helper text shown below the input.',
    control: 'text',
    category: 'field',
  },
  {
    name: 'error',
    type: 'string | string[]',
    default: '',
    description: 'Error message(s) shown below the input. Also marks the field as invalid.',
    control: 'text',
    category: 'validation',
  },
  {
    name: 'required',
    type: 'boolean',
    default: false,
    description: 'Marks the field as required.',
    control: 'toggle',
    category: 'validation',
  },
  {
    name: 'invalid',
    type: 'boolean',
    default: false,
    description: 'Forces the invalid visual state independently of the error prop.',
    control: 'toggle',
    category: 'validation',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: false,
    description: 'Disables the input.',
    control: 'toggle',
    category: 'state',
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
          :label="values.label"
          :error="values.error"
          :help-text="values.helpText"
          :required="values.required"
          :invalid="values.invalid"
          :disabled="values.disabled"
        />
      </template>
    </SwPlayground>
  </SwPage>
</template>
