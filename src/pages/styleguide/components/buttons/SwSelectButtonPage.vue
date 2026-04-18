<script setup lang="ts">
import { ref } from 'vue';
import SwPage from '@/components/layout/SwPage.vue';
import SwSelectButton from '@/components/ui/buttons/SwSelectButton.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue';

const selected = ref('week');

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'modelValue',
    type: 'string',
    description: 'The currently selected option value. Bind with v-model.',
    control: 'none',
  },
  {
    name: 'options',
    type: 'SwSelectButtonOption[]',
    description: 'The list of selectable options.',
    control: 'preset',
    presets: [
      {
        label: '4 options',
        value: [
          { value: 'day', label: 'Day', icon: '' },
          { value: 'week', label: 'Week', icon: '' },
          { value: 'month', label: 'Month', icon: '' },
          { value: 'year', label: 'Year', icon: '' },
        ],
      },
      {
        label: 'With icons',
        value: [
          { value: 'list', label: 'List', icon: 'list' },
          { value: 'grid', label: 'Grid', icon: 'grid-2x2' },
          { value: 'table', label: 'Table', icon: 'table' },
        ],
      },
      {
        label: '2 options',
        value: [
          { value: 'on', label: 'On', icon: '' },
          { value: 'off', label: 'Off', icon: '' },
        ],
      },
    ],
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: 'md',
    description: 'Physical size of the items.',
    control: 'select',
    options: ['sm', 'md', 'lg'],
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: false,
    description: 'Prevents interaction and dims all options.',
    control: 'toggle',
  },
];
</script>

<template>
  <SwPage
    title="SwSelectButton"
    description="Compact, visually-grouped mutually-exclusive choices. Distinct from Tabs — use this for binding a single value."
  >
    <SwPlayground :props-config="playgroundConfig" component-name="SwSelectButton">
      <template #default="{ values }">
        <SwSelectButton
          v-model="selected"
          :options="values.options"
          :size="values.size"
          :disabled="values.disabled"
        />
      </template>
    </SwPlayground>
  </SwPage>
</template>
