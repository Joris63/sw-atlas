<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue';
import SwBanner from '@/components/ui/feedback/SwBanner.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue';

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'variant',
    type: "'announcement' | 'info' | 'success' | 'warning' | 'danger'",
    default: 'info',
    description: 'Visual style and icon for the banner.',
    control: 'select',
    options: ['announcement', 'info', 'success', 'warning', 'danger'],
    initialValue: 'announcement',
    category: 'appearance',
  },
  {
    name: 'title',
    type: 'string',
    default: '',
    description: 'Bold label at the start of the banner.',
    control: 'text',
    initialValue: 'Maintenance scheduled.',
    category: 'content',
  },
  {
    name: 'description',
    type: 'string',
    default: '',
    description: 'Inline text shown after the title.',
    control: 'text',
    initialValue: 'Atlas will be read-only on Apr 20, 02:00–03:00 UTC.',
    category: 'content',
  },
  {
    name: 'icon',
    type: 'string',
    default: '',
    description: 'Override the default icon. Accepts any Lucide icon name.',
    control: 'icon',
    category: 'appearance',
  },
  {
    name: 'dismissible',
    type: 'boolean',
    default: false,
    description: 'Shows a close button that emits a dismiss event.',
    control: 'toggle',
    category: 'appearance',
  },
];
</script>

<template>
  <SwPage
    title="SwBanner"
    description="Contextual feedback for announcements, info, success, warnings, and errors. The announcement variant uses the primary color for system-wide messages."
  >
    <SwPlayground :props-config="playgroundConfig" component-name="SwBanner">
      <template #default="{ values }">
        <SwBanner
          :variant="values.variant"
          :title="values.title"
          :description="values.description || undefined"
          :icon="values.icon || undefined"
          :dismissible="values.dismissible"
        />
      </template>
    </SwPlayground>
  </SwPage>
</template>
