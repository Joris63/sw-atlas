<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue'
import SwHeading from '@/components/ui/typography/SwHeading.vue'
import SwPlayground from '@/components/ui/docs/SwPlayground.vue'
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue'

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: '_content',
    type: 'slot',
    description: 'Heading text content.',
    control: 'text',
    initialValue: 'Heading text',
    isSlotContent: true,
  },
  {
    name: 'level',
    type: '1 | 2 | 3 | 4 | 5 | 6',
    default: '2',
    description: 'Semantic HTML heading level (h1–h6).',
    control: 'segmented',
    options: ['1', '2', '3', '4', '5', '6'],
    isNumeric: true,
  },
  {
    name: 'size',
    type: "'5xl' | '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'base' | 'sm'",
    default: 'auto',
    description: 'Visual size override. Defaults to a size mapped from level.',
    control: 'segmented',
    options: ['auto', '5xl', '4xl', '3xl', '2xl', 'xl', 'lg', 'base', 'sm'],
  },
]
</script>

<template>
  <SwPage
    title="SwHeading"
    description="Semantic headings h1–h6 with sensible default sizes. Override visually with the size prop without changing the HTML element."
  >
    <SwPlayground
      :props-config="playgroundConfig"
      component-name="SwHeading"
      preview-class="flex-col items-start"
    >
      <template #default="{ values }">
        <SwHeading
          :level="Number(values.level) as 1 | 2 | 3 | 4 | 5 | 6 | undefined"
          :size="values.size === 'auto' ? undefined : values.size"
        >
          {{ values._content }}
        </SwHeading>
      </template>
    </SwPlayground>
  </SwPage>
</template>
