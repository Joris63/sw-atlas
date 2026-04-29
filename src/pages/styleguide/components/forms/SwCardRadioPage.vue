<script setup lang="ts">
import { ref } from 'vue';
import SwPage from '@/components/layout/SwPage.vue';
import SwCardRadio from '@/components/ui/forms/SwCardRadio.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig, PlaygroundPreset } from '@/components/ui/docs/SwPlayground.vue';

const selected = ref('business');

const PLAN_OPTIONS = [
  {
    value: 'standard',
    label: 'Standard plan',
    description: 'Up to 5 users, 10 GB storage',
    icon: 'user',
  },
  {
    value: 'business',
    label: 'Business plan',
    description: 'Up to 50 users, 100 GB storage',
    icon: 'users',
  },
  {
    value: 'enterprise',
    label: 'Enterprise plan',
    description: 'Unlimited users and storage',
    icon: 'settings-2',
  },
];

const optionPresets: PlaygroundPreset[] = [
  {
    label: 'With icons',
    value: PLAN_OPTIONS,
  },
  {
    label: 'No icons',
    value: PLAN_OPTIONS.map((o) => ({
      value: o.value,
      label: o.label,
      description: o.description,
    })),
  },
  {
    label: 'With disabled',
    value: [PLAN_OPTIONS[0], { ...PLAN_OPTIONS[1], disabled: true }, PLAN_OPTIONS[2]],
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
    type: 'SwCardRadioOption[]',
    description:
      'The list of options. Each option supports label, description, icon, and disabled.',
    control: 'preset',
    presets: optionPresets,
    initialValue: optionPresets[0]?.value,
    category: 'content',
  },
  {
    name: 'layout',
    type: "'stacked' | 'tiled' | 'pill'",
    default: 'stacked',
    description: 'Visual layout of the card options.',
    control: 'select',
    options: ['stacked', 'tiled', 'pill'],
    initialValue: 'stacked',
    category: 'appearance',
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
  <SwPage
    title="SwCardRadio"
    description="A card-based radio group with three layout variants — stacked, tiled, and pill. Supports icons and descriptions."
  >
    <SwPlayground :props-config="playgroundConfig" component-name="SwCardRadio">
      <template #default="{ values }">
        <SwCardRadio
          v-model="selected"
          :options="values.options"
          :layout="values.layout"
          :disabled="values.disabled"
          class="w-full max-w-md"
        />
      </template>
    </SwPlayground>
  </SwPage>
</template>
