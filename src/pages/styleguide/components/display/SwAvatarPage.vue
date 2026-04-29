<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue';
import SwAvatar from '@/components/ui/display/SwAvatar.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue';

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'name',
    type: 'string',
    default: '',
    description: 'Full name used to generate initials and pick a color.',
    control: 'text',
    initialValue: 'Alice Chen',
    category: 'content',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: 'md',
    description: 'Avatar size.',
    control: 'select',
    options: ['xs', 'sm', 'md', 'lg', 'xl'],
    initialValue: 'md',
    category: 'appearance',
  },
  {
    name: 'presence',
    type: "'online' | 'offline' | 'away' | 'busy'",
    default: '',
    description: 'Presence indicator shown as a dot on the bottom-right.',
    control: 'select',
    options: ['online', 'offline', 'away', 'busy'],
    category: 'appearance',
  },
];
</script>

<template>
  <SwPage
    title="SwAvatar"
    description="A user avatar with auto-generated initials and color. Supports image fallback and presence indicators."
  >
    <SwPlayground :props-config="playgroundConfig" component-name="SwAvatar">
      <template #default="{ values }">
        <SwAvatar
          :name="values.name"
          :size="values.size"
          :presence="values.presence || undefined"
        />
      </template>
    </SwPlayground>
  </SwPage>
</template>
