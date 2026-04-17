<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue'
import SwBadge from '@/components/ui/SwBadge.vue'
import SwPlayground from '@/components/ui/docs/SwPlayground.vue'
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue'

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'default',
    type: 'string',
    description: 'Badge label text.',
    control: 'text',
    initialValue: 'Badge',
    isSlotContent: true,
  },
  {
    name: 'variant',
    type: "'neutral' | 'primary' | 'success' | 'warning' | 'danger'",
    default: 'neutral',
    description: 'Color variant.',
    control: 'segmented',
    options: ['neutral', 'primary', 'success', 'warning', 'danger'],
  },
  {
    name: 'size',
    type: "'sm' | 'md'",
    default: 'md',
    description: 'Physical size of the badge.',
    control: 'segmented',
    options: ['sm', 'md'],
  },
  {
    name: 'dot',
    type: 'boolean',
    default: false,
    description: 'Show a colored dot indicator before the label.',
    control: 'toggle',
  },
]
</script>

<template>
  <SwPage title="SwBadge" description="Compact labels for status, categories, or counts.">
    <SwPlayground :props-config="playgroundConfig" component-name="SwBadge">
      <template #default="{ values }">
        <SwBadge :variant="values.variant" :size="values.size" :dot="values.dot">
          {{ values.default }}
        </SwBadge>
      </template>
    </SwPlayground>
  </SwPage>
</template>
