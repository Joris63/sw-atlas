<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue';
import SwTooltip from '@/components/ui/SwTooltip.vue';
import SwIconButton from '@/components/ui/buttons/SwIconButton.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue';

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'content',
    type: 'string',
    description: 'Text shown inside the tooltip.',
    control: 'text',
    initialValue: 'Rotate API key',
    required: true,
  },
  {
    name: 'placement',
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: 'top',
    description: 'Preferred side relative to the trigger.',
    control: 'select',
    options: ['top', 'bottom', 'left', 'right'],
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: false,
    description: 'Suppresses the tooltip entirely.',
    control: 'toggle',
  },
  {
    name: 'openDelay',
    type: 'number',
    default: 400,
    description: 'Milliseconds before the tooltip opens.',
    control: 'none',
  },
  {
    name: 'closeDelay',
    type: 'number',
    default: 100,
    description: 'Milliseconds before the tooltip closes.',
    control: 'none',
  },
];
</script>

<template>
  <SwPage
    title="SwTooltip"
    description="A hover tooltip built on Ark UI. Wraps any trigger via the default slot."
  >
    <SwPlayground :props-config="playgroundConfig" component-name="SwTooltip">
      <template #default="{ values }">
        <SwTooltip
          :content="values.content"
          :placement="values.placement"
          :disabled="values.disabled"
        >
          <SwIconButton icon="refresh-cw" label="Rotate API key" variant="outline" />
        </SwTooltip>
      </template>
    </SwPlayground>
  </SwPage>
</template>
