<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue';
import SwAvatarGroup from '@/components/ui/display/SwAvatarGroup.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig, PlaygroundPreset } from '@/components/ui/docs/SwPlayground.vue';

const itemPresets: PlaygroundPreset[] = [
  {
    label: '4 members',
    value: [
      { name: 'Alice Chen' },
      { name: 'Marcus Wright' },
      { name: 'Priya Nair' },
      { name: 'James Beck' },
    ],
  },
  {
    label: '7 members',
    value: [
      { name: 'Alice Chen' },
      { name: 'Marcus Wright' },
      { name: 'Priya Nair' },
      { name: 'James Beck' },
      { name: 'Sara Torres' },
      { name: 'Leo Muller' },
      { name: 'Nina Park' },
    ],
  },
];

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'items',
    type: 'AvatarItem[]',
    description: 'List of avatar items to display.',
    control: 'preset',
    presets: itemPresets,
    initialValue: itemPresets[1]?.value,
    category: 'content',
  },
  {
    name: 'max',
    type: 'number',
    default: 4,
    description: 'Maximum avatars shown before the overflow badge appears.',
    control: 'select',
    options: ['2', '3', '4', '5', '6'],
    initialValue: '4',
    category: 'appearance',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: 'md',
    description: 'Size applied to all avatars in the group.',
    control: 'select',
    options: ['xs', 'sm', 'md', 'lg', 'xl'],
    initialValue: 'sm',
    category: 'appearance',
  },
];
</script>

<template>
  <SwPage
    title="SwAvatarGroup"
    description="Displays multiple avatars in an overlapping stack with an overflow badge when the count exceeds max."
  >
    <SwPlayground :props-config="playgroundConfig" component-name="SwAvatarGroup">
      <template #default="{ values }">
        <SwAvatarGroup :items="values.items" :max="Number(values.max)" :size="values.size" />
      </template>
    </SwPlayground>
  </SwPage>
</template>
