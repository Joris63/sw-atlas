<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue';
import SwText from '@/components/ui/typography/SwText.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue';

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'content',
    type: 'slot',
    description: 'Text content.',
    control: 'text',
    initialValue: 'The quick brown fox jumps over the lazy dog.',
    isSlotContent: true,
    category: 'content',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'base' | 'lg' | 'xl'",
    default: 'base',
    description: 'Font size.',
    control: 'select',
    options: ['xs', 'sm', 'base', 'lg', 'xl'],
    category: 'appearance',
  },
  {
    name: 'weight',
    type: "'normal' | 'medium' | 'semibold'",
    default: 'normal',
    description: 'Font weight.',
    control: 'select',
    options: ['normal', 'medium', 'semibold'],
    category: 'appearance',
  },
  {
    name: 'color',
    type: "'default' | 'muted' | 'subtle'",
    default: 'default',
    description: 'Text color token.',
    control: 'select',
    options: ['default', 'muted', 'subtle'],
    category: 'appearance',
  },
  {
    name: 'as',
    type: 'string',
    default: "'p'",
    description: 'HTML element to render as.',
    control: 'none',
    category: 'advanced',
  },
];
</script>

<template>
  <SwPage
    title="SwText"
    description="Body copy rendered as a paragraph by default. Configurable size, color, and weight."
  >
    <SwPlayground :props-config="playgroundConfig" component-name="SwText">
      <template #default="{ values }">
        <SwText :size="values.size" :weight="values.weight" :color="values.color">
          {{ values.content }}
        </SwText>
      </template>
    </SwPlayground>
  </SwPage>
</template>
