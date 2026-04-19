<script setup lang="ts">
import { ref } from 'vue';
import SwPage from '@/components/layout/SwPage.vue';
import SwRadio from '@/components/ui/forms/SwRadio.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig, PlaygroundPreset } from '@/components/ui/docs/SwPlayground.vue';

const selected = ref('standard');

const optionPresets: PlaygroundPreset[] = [
  {
    label: 'Basic',
    value: [
      { value: 'standard', label: 'Standard plan' },
      { value: 'business', label: 'Business plan' },
      { value: 'enterprise', label: 'Enterprise plan' },
    ],
  },
  {
    label: 'With descriptions',
    value: [
      { value: 'standard', label: 'Standard plan', description: 'Up to 5 users, 10 GB storage' },
      { value: 'business', label: 'Business plan', description: 'Up to 50 users, 100 GB storage' },
      { value: 'enterprise', label: 'Enterprise plan', description: 'Unlimited users and storage' },
    ],
  },
  {
    label: 'Two options',
    value: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
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
    description:
      'The list of radio options. Each option can have a label and optional description.',
    control: 'preset',
    presets: optionPresets,
    initialValue: optionPresets[0]?.value,
  },
  {
    name: 'variant',
    type: "'default' | 'card'",
    default: 'default',
    description:
      'Visual style. Card variant shows options as bordered cards with description support.',
    control: 'select',
    options: ['default', 'card'],
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: false,
    description: 'Disables the entire group.',
    control: 'toggle',
  },
];
</script>

<template>
  <SwPage
    title="SwRadio"
    description="A radio group built on Ark UI. Supports a default inline style and a card variant with optional descriptions."
  >
    <SwPlayground :props-config="playgroundConfig" component-name="SwRadio">
      <template #default="{ values }">
        <SwRadio
          v-model="selected"
          :options="values.options"
          :variant="values.variant"
          :disabled="values.disabled"
          class="w-full max-w-sm"
        />
      </template>
    </SwPlayground>
  </SwPage>
</template>
