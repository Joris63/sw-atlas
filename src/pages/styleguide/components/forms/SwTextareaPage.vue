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
  },
  {
    name: 'rows',
    type: 'number',
    default: 3,
    description: 'Number of visible text rows.',
    control: 'select',
    options: ['2', '3', '5', '8'],
    initialValue: '3',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: 'md',
    description: 'Controls font size and padding.',
    control: 'select',
    options: ['sm', 'md', 'lg'],
    initialValue: 'md',
  },
  {
    name: 'resize',
    type: "'none' | 'vertical' | 'both'",
    default: 'vertical',
    description: 'CSS resize behavior of the textarea.',
    control: 'select',
    options: ['none', 'vertical', 'both'],
    initialValue: 'vertical',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: false,
    description: 'Prevents interaction and dims the textarea.',
    control: 'toggle',
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
          :disabled="values.disabled"
          class="w-80"
        />
      </template>
    </SwPlayground>
  </SwPage>
</template>
