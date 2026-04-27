<script setup lang="ts">
import { ref } from 'vue';
import SwPage from '@/components/layout/SwPage.vue';
import SwTextarea from '@/components/ui/forms/SwTextarea.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue';

const value = ref('');

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'modelValue',
    type: 'string',
    description: 'The textarea value. Bind with v-model.',
    control: 'none',
  },
  {
    name: 'placeholder',
    type: 'string',
    default: '',
    description: 'Placeholder text shown when the textarea is empty.',
    control: 'text',
    initialValue: 'Write something…',
    category: 'appearance',
  },
  {
    name: 'rows',
    type: 'number',
    default: 3,
    description: 'Number of visible text rows.',
    control: 'select',
    options: ['2', '3', '5', '8'],
    initialValue: '3',
    category: 'appearance',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: 'md',
    description: 'Controls font size and padding.',
    control: 'select',
    options: ['sm', 'md', 'lg'],
    initialValue: 'md',
    category: 'appearance',
  },
  {
    name: 'resize',
    type: "'none' | 'vertical' | 'both'",
    default: 'vertical',
    description: 'CSS resize behavior of the textarea.',
    control: 'select',
    options: ['none', 'vertical', 'both'],
    initialValue: 'vertical',
    category: 'appearance',
  },
  {
    name: 'label',
    type: 'string',
    default: '',
    description: 'Label text rendered above the textarea.',
    control: 'text',
    initialValue: 'Description',
    category: 'field',
  },
  {
    name: 'helpText',
    type: 'string',
    default: '',
    description: 'Helper text shown below the textarea.',
    control: 'text',
    category: 'field',
  },
  {
    name: 'error',
    type: 'string | string[]',
    default: '',
    description: 'Error message(s) shown below the textarea. Also marks the field as invalid.',
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
    description: 'Prevents interaction and dims the textarea.',
    control: 'toggle',
    category: 'state',
  },
];
</script>

<template>
  <SwPage
    title="SwTextarea"
    description="A multi-line text input built on Ark UI's FieldTextarea. Supports size variants and configurable resize behavior."
  >
    <SwPlayground :props-config="playgroundConfig" component-name="SwTextarea">
      <template #default="{ values }">
        <SwTextarea
          v-model="value"
          :placeholder="values.placeholder"
          :rows="Number(values.rows)"
          :size="values.size"
          :resize="values.resize"
          :label="values.label"
          :error="values.error"
          :help-text="values.helpText"
          :required="values.required"
          :invalid="values.invalid"
          :disabled="values.disabled"
          class="w-80"
        />
      </template>
    </SwPlayground>
  </SwPage>
</template>
