<script setup lang="ts">
import { ref } from 'vue';
import SwPage from '@/components/layout/SwPage.vue';
import SwRadio from '@/components/ui/forms/SwRadio.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig, PlaygroundPreset } from '@/components/ui/docs/SwPlayground.vue';

const selected = ref('standard');

const optionPresets: PlaygroundPreset[] = [
  {
    label: 'Three options',
    value: [
      { value: 'standard', label: 'Standard plan' },
      { value: 'business', label: 'Business plan' },
      { value: 'enterprise', label: 'Enterprise plan' },
    ],
  },
  {
    label: 'Two options',
    value: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
  {
    label: 'With disabled',
    value: [
      { value: 'standard', label: 'Standard plan' },
      { value: 'business', label: 'Business plan', disabled: true },
      { value: 'enterprise', label: 'Enterprise plan' },
    ],
  },
];

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'modelValue',
    type: 'string',
    description: 'The currently selected option value. Bind with v-model.',
    control: 'none',
  },
  {
    name: 'options',
    type: 'SwRadioOption[]',
    description: 'The list of radio options.',
    control: 'preset',
    presets: optionPresets,
    initialValue: optionPresets[0]?.value,
    category: 'content',
  },
  {
    name: 'label',
    type: 'string',
    default: '',
    description: 'Label text rendered above the radio group.',
    control: 'text',
    initialValue: 'Select a plan',
    category: 'field',
  },
  {
    name: 'helpText',
    type: 'string',
    default: '',
    description: 'Helper text shown below the radio group.',
    control: 'text',
    category: 'field',
  },
  {
    name: 'error',
    type: 'string | string[]',
    default: '',
    description: 'Error message shown below the radio group.',
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
    name: 'disabled',
    type: 'boolean',
    default: false,
    description: 'Disables the entire group.',
    control: 'toggle',
    category: 'state',
  },
];
</script>

<template>
  <SwPage title="SwRadio" description="A simple radio group for selecting one option from a list.">
    <SwPlayground :props-config="playgroundConfig" component-name="SwRadio">
      <template #default="{ values }">
        <SwRadio
          v-model="selected"
          :options="values.options"
          :label="values.label"
          :error="values.error"
          :help-text="values.helpText"
          :required="values.required"
          :disabled="values.disabled"
        />
      </template>
    </SwPlayground>
  </SwPage>
</template>
