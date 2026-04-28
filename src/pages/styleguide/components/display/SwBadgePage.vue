<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue';
import SwBadge from '@/components/ui/display/SwBadge.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue';

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'content',
    type: 'slot',
    description: 'Badge label text.',
    control: 'text',
    initialValue: 'Badge',
    isSlotContent: true,
    category: 'content',
  },
  {
    name: 'variant',
    type: "'neutral' | 'primary' | 'success' | 'warning' | 'danger'",
    default: 'neutral',
    description: 'Color variant.',
    control: 'select',
    options: ['neutral', 'primary', 'success', 'warning', 'danger'],
    category: 'appearance',
  },
  {
    name: 'size',
    type: "'sm' | 'md'",
    default: 'md',
    description: 'Physical size of the badge.',
    control: 'select',
    options: ['sm', 'md'],
    category: 'appearance',
  },
  {
    name: 'icon',
    type: 'string',
    default: '',
    description: 'Lucide icon name shown before the label.',
    control: 'icon',
    category: 'content',
  },
  {
    name: 'dot',
    type: 'boolean',
    default: false,
    description: 'Show a colored dot indicator before the label.',
    control: 'toggle',
    category: 'appearance',
  },
  {
    name: 'animated',
    type: 'boolean',
    default: false,
    description: 'Pulse-animate the dot (requires dot=true).',
    control: 'toggle',
    showWhen: (v) => !!v.dot,
    category: 'appearance',
  },
];
</script>

<template>
  <SwPage title="SwBadge" description="Compact labels for status, categories, or counts.">
    <SwPlayground :props-config="playgroundConfig" component-name="SwBadge">
      <template #default="{ values }">
        <SwBadge
          :variant="values.variant"
          :size="values.size"
          :icon="values.icon || undefined"
          :dot="values.dot"
          :animated="values.animated"
        >
          {{ values.content }}
        </SwBadge>
      </template>
    </SwPlayground>
  </SwPage>
</template>
