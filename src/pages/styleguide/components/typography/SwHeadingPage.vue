<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue';
import SwHeading from '@/components/ui/typography/SwHeading.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue';

function toHeadingLevel(value: string): 1 | 2 | 3 | 4 | 5 | 6 {
  return Number(value) as 1 | 2 | 3 | 4 | 5 | 6;
}

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'content',
    type: 'slot',
    description: 'Heading text content.',
    control: 'text',
    initialValue: 'Heading text',
    isSlotContent: true,
    category: 'content',
  },
  {
    name: 'level',
    type: '1 | 2 | 3 | 4 | 5 | 6',
    default: '2',
    description: 'Semantic HTML heading level (h1–h6).',
    control: 'select',
    options: ['1', '2', '3', '4', '5', '6'],
    isNumeric: true,
    category: 'appearance',
  },
  {
    name: 'size',
    type: "'5xl' | '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'base' | 'sm'",
    default: 'auto',
    description: 'Visual size override. Defaults to a size mapped from level.',
    control: 'select',
    options: ['auto', '5xl', '4xl', '3xl', '2xl', 'xl', 'lg', 'base', 'sm'],
    category: 'appearance',
  },
];
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
          :level="toHeadingLevel(values.level)"
          :size="values.size === 'auto' ? undefined : values.size"
        >
          {{ values.content }}
        </SwHeading>
      </template>
    </SwPlayground>
  </SwPage>
</template>
