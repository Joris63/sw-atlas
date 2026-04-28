<script setup lang="ts">
import { ref } from 'vue';
import SwPage from '@/components/layout/SwPage.vue';
import SwSelect from '@/components/ui/forms/SwSelect.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig, PlaygroundPreset } from '@/components/ui/docs/SwPlayground.vue';

const selected = ref('');

const optionPresets: PlaygroundPreset[] = [
  {
    label: 'Frameworks',
    value: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'svelte', label: 'Svelte' },
      { value: 'angular', label: 'Angular' },
    ],
  },
  {
    label: 'Status',
    value: [
      { value: 'active', label: 'Active' },
      { value: 'paused', label: 'Paused' },
      { value: 'archived', label: 'Archived' },
      { value: 'deleted', label: 'Deleted' },
    ],
  },
  {
    label: 'Long labels',
    value: [
      { value: 'north-america', label: 'North America (UTC-5 to UTC-8)' },
      { value: 'europe', label: 'Europe (UTC+1 to UTC+3)' },
      { value: 'asia-pacific', label: 'Asia Pacific (UTC+8 to UTC+12)' },
    ],
  },
];

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'modelValue',
    type: 'string',
    description: 'The currently selected value. Bind with v-model.',
    control: 'none',
  },
  {
    name: 'options',
    type: 'SwSelectOption[]',
    description: 'List of options. Each option requires a value and label.',
    control: 'preset',
    presets: optionPresets,
    initialValue: optionPresets[0]?.value,
    category: 'content',
  },
  {
    name: 'placeholder',
    type: 'string',
    default: 'Select…',
    description: 'Placeholder shown when no option is selected.',
    control: 'text',
    initialValue: 'Pick a framework…',
    category: 'appearance',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: 'md',
    description: 'Height and font size of the trigger.',
    control: 'select',
    options: ['sm', 'md', 'lg'],
    category: 'appearance',
  },
  {
    name: 'deselectable',
    type: 'boolean',
    default: true,
    description: 'Allows the value from being deselected.',
    control: 'toggle',
    category: 'appearance',
  },
  {
    name: 'label',
    type: 'string',
    default: '',
    description: 'Label text rendered above the select.',
    control: 'text',
    initialValue: 'Framework',
    category: 'field',
  },
  {
    name: 'helpText',
    type: 'string',
    default: '',
    description: 'Helper text shown below the select.',
    control: 'text',
    category: 'field',
  },
  {
    name: 'error',
    type: 'string | string[]',
    default: '',
    description: 'Error message(s) shown below the select. Also marks the field as invalid.',
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
    description: 'Prevents interaction and dims the select.',
    control: 'toggle',
    category: 'state',
  },
  {
    name: 'loadingOptions',
    type: 'boolean',
    default: false,
    description: 'Loading state when loading in items.',
    control: 'toggle',
    category: 'state',
  },
];
</script>

<template>
  <SwPage
    title="SwSelect"
    description="A single-select dropdown built on Ark UI. Use v-model to bind the selected value."
  >
    <SwPlayground :props-config="playgroundConfig" component-name="SwSelect">
      <template #default="{ values }">
        <SwSelect
          v-model="selected"
          :options="values.options"
          :placeholder="values.placeholder"
          :size="values.size"
          :deselectable="values.deselectable"
          :label="values.label"
          :error="values.error"
          :help-text="values.helpText"
          :required="values.required"
          :invalid="values.invalid"
          :disabled="values.disabled"
          :loading-options="values.loadingOptions"
          class="w-64"
        />
      </template>
    </SwPlayground>
  </SwPage>
</template>
