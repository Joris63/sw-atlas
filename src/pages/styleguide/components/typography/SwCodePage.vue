<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue'
import SwCode from '@/components/ui/SwCode.vue'
import SwPlayground from '@/components/ui/SwPlayground.vue'
import type { PlaygroundPropConfig } from '@/components/ui/SwPlayground.vue'

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: '_content',
    type: 'slot',
    description: 'Code snippet text.',
    control: 'text',
    initialValue: 'bg-primary',
    isSlotContent: true,
  },
  {
    name: 'block',
    type: 'boolean',
    default: false,
    description: 'Renders as a block element with larger padding.',
    control: 'toggle',
  },
]
</script>

<template>
  <SwPage title="SwCode" description="Inline code snippets for use within body text.">
    <SwPlayground :props-config="playgroundConfig" component-name="SwCode">
      <template #default="{ values }">
        <SwCode :block="values.block">{{ values._content }}</SwCode>
      </template>
    </SwPlayground>
  </SwPage>
</template>
