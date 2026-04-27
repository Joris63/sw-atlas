<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue';
import SwInput from '@/components/ui/forms/SwInput.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue';

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'modelValue',
    type: 'string',
    description: 'The current value of the input. Bind with v-model.',
    control: 'none',
  },
  {
    name: 'placeholder',
    type: 'string',
    default: '',
    description: 'Placeholder text shown when the input is empty.',
    control: 'text',
    initialValue: 'Enter text…',
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
    name: 'label',
    type: 'string',
    default: '',
    description: 'Label text rendered above the input.',
    control: 'text',
    initialValue: 'Email address',
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
    description: 'Prevents interaction and dims the input.',
    control: 'toggle',
    category: 'state',
  },
];
</script>

<template>
  <SwPage
    title="SwInput"
    description="A single-line text input built on Ark UI's Field. Use v-model to bind the value."
  >
    <SwPlayground :props-config="playgroundConfig" component-name="SwInput">
      <template #default="{ values }">
        <SwInput
          :placeholder="values.placeholder"
          :size="values.size"
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
