<script setup lang="ts">
import SwButton from '@/components/ui/buttons/SwButton.vue'
import SwPage from '@/components/layout/SwPage.vue'
import SwPlayground from '@/components/ui/docs/SwPlayground.vue'
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue'

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'label',
    type: 'string',
    required: true,
    description: 'Visible button text.',
    control: 'text',
    initialValue: 'Button',
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
    description: 'Height and padding of the button.',
    control: 'segmented',
    options: ['2xs', 'xs', 'sm', 'md', 'lg'],
  },
  {
    name: 'iconLeft',
    type: 'string',
    default: '',
    description: 'Lucide icon name to display before the label.',
    control: 'icon',
  },
  {
    name: 'iconRight',
    type: 'string',
    default: '',
    description: 'Lucide icon name to display after the label.',
    control: 'icon',
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
    name: 'loadingText',
    type: 'string',
    default: '',
    description: 'Text shown next to the spinner while loading.',
    control: 'text',
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
    title="Button"
    description="Trigger actions and navigation. Supports multiple variants, sizes, icons, and states."
  >
    <SwPlayground :props-config="playgroundConfig" component-name="SwButton">
      <template #default="{ values }">
        <SwButton
          :label="values.label"
          :variant="values.variant"
          :size="values.size"
          :icon-left="values.iconLeft || undefined"
          :icon-right="values.iconRight || undefined"
          :disabled="values.disabled"
          :loading="values.loading"
          :loading-text="values.loadingText || undefined"
        />
      </template>
    </SwPlayground>
  </SwPage>
</template>
