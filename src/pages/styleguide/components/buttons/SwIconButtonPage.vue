<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue'
import SwIconButton from '@/components/ui/buttons/SwIconButton.vue'
import SwPlayground from '@/components/ui/docs/SwPlayground.vue'
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue'

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'label',
    type: 'string',
    required: true,
    description: 'Accessible label — rendered as aria-label. Always required.',
    control: 'text',
    initialValue: 'Edit',
  },
  {
    name: 'icon',
    type: 'string',
    default: '',
    description: 'Lucide icon name.',
    control: 'text',
    initialValue: 'pencil',
  },
  {
    name: 'variant',
    type: "'primary' | 'outline' | 'ghost' | 'plain' | 'danger'",
    default: 'primary',
    description: 'Visual style of the button.',
    control: 'segmented',
    options: ['primary', 'outline', 'ghost', 'plain', 'danger'],
  },
  {
    name: 'size',
    type: "'2xs' | 'xs' | 'sm' | 'md' | 'lg'",
    default: 'md',
    description: 'Size of the button.',
    control: 'segmented',
    options: ['2xs', 'xs', 'sm', 'md', 'lg'],
  },
  {
    name: 'rounded',
    type: 'boolean',
    default: false,
    description: 'Fully round corners.',
    control: 'toggle',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: false,
    description: 'Prevents interaction and dims the button.',
    control: 'toggle',
  },
  {
    name: 'loading',
    type: 'boolean',
    default: false,
    description: 'Shows a spinner and disables the button.',
    control: 'toggle',
  },
  {
    name: 'as',
    type: 'string',
    default: "'button'",
    description: 'HTML element or component to render as.',
    control: 'none',
  },
]
</script>

<template>
  <SwPage
    title="Icon Button"
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
