<script setup lang="ts">
import { ref } from 'vue';
import SwPage from '@/components/layout/SwPage.vue';
import SwSwitch from '@/components/ui/forms/SwSwitch.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue';

const checked = ref(false);

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'modelValue',
    type: 'boolean',
    description: 'Checked state of the switch. Bind with v-model.',
    control: 'none',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: 'md',
    description: 'Physical size of the switch track and thumb.',
    control: 'select',
    options: ['sm', 'md', 'lg'],
    category: 'appearance',
  },
  {
    name: 'label',
    type: 'string',
    default: '',
    description: 'Label text rendered inline next to the switch toggle.',
    control: 'text',
    initialValue: 'Enable notifications',
    category: 'field',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: false,
    description: 'Prevents interaction and dims the switch.',
    control: 'toggle',
    category: 'state',
  },
];
</script>

<template>
  <SwPage
    title="SwSwitch"
    description="A toggle switch built on Ark UI. Use v-model to bind the checked state."
  >
    <SwPlayground :props-config="playgroundConfig" component-name="SwSwitch">
      <template #default="{ values }">
        <SwSwitch
          v-model="checked"
          :size="values.size"
          :label="values.label"
          :disabled="values.disabled"
        />
      </template>
    </SwPlayground>
  </SwPage>
</template>
