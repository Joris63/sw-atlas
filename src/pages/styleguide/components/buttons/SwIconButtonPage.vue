<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue';
import SwIconButton from '@/components/ui/buttons/SwIconButton.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue';

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'label',
    type: 'string',
    required: true,
    description: 'Accessible label — rendered as aria-label. Always required.',
    control: 'text',
    initialValue: 'Edit',
    category: 'content',
  },
  {
    name: 'icon',
    type: 'string',
    default: '',
    description: 'Lucide icon name.',
    control: 'icon',
    initialValue: 'pencil',
    category: 'content',
  },
  {
    name: 'variant',
    type: "'primary' | 'outline' | 'ghost' | 'plain' | 'danger'",
    default: 'primary',
    description: 'Visual style of the button.',
    control: 'select',
    options: ['primary', 'outline', 'ghost', 'plain', 'danger'],
    category: 'appearance',
  },
  {
    name: 'size',
    type: "'2xs' | 'xs' | 'sm' | 'md' | 'lg'",
    default: 'md',
    description: 'Size of the button.',
    control: 'select',
    options: ['2xs', 'xs', 'sm', 'md', 'lg'],
    category: 'appearance',
  },
  {
    name: 'rounded',
    type: 'boolean',
    default: false,
    description: 'Fully round corners.',
    control: 'toggle',
    category: 'appearance',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: false,
    description: 'Prevents interaction and dims the button.',
    control: 'toggle',
    category: 'state',
  },
  {
    name: 'loading',
    type: 'boolean',
    default: false,
    description: 'Shows a spinner and disables the button.',
    control: 'toggle',
    category: 'state',
  },
  {
    name: 'as',
    type: 'string',
    default: "'button'",
    description: 'HTML element or component to render as.',
    control: 'none',
    category: 'advanced',
  },
];
</script>

<template>
  <SwPage
    title="SwIconButton"
    description="A square button that contains only an icon. Always provide a label prop for accessibility — it becomes the aria-label."
  >
    <SwPlayground :props-config="playgroundConfig" component-name="SwIconButton">
      <template #default="{ values }">
        <SwIconButton
          :label="values.label"
          :icon="values.icon || undefined"
          :variant="values.variant"
          :size="values.size"
          :rounded="values.rounded"
          :disabled="values.disabled"
          :loading="values.loading"
        />
      </template>
    </SwPlayground>
  </SwPage>
</template>
