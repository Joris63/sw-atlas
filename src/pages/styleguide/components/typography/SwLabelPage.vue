<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue'
import SwLabel from '@/components/ui/SwLabel.vue'
import SwPlayground from '@/components/ui/SwPlayground.vue'
import type { PlaygroundPropConfig } from '@/components/ui/SwPlayground.vue'

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: '_content',
    type: 'slot',
    description: 'Label text content.',
    control: 'text',
    initialValue: 'Email address',
    isSlotContent: true,
  },
  {
    name: 'size',
    type: "'xs' | 'sm'",
    default: 'sm',
    description: 'Font size.',
    control: 'segmented',
    options: ['xs', 'sm'],
  },
  {
    name: 'uppercase',
    type: 'boolean',
    default: false,
    description: 'Renders in uppercase with letter-spacing.',
    control: 'toggle',
  },
  {
    name: 'required',
    type: 'boolean',
    default: false,
    description: 'Appends a red asterisk (*) to signal a required field.',
    control: 'toggle',
  },
  {
    name: 'for',
    type: 'string',
    default: '',
    description: "Associates the label with an input's id.",
    control: 'none',
  },
]
</script>

<template>
  <SwPage
    title="SwLabel"
    description="Form field labels and section headings. Use the for prop to associate with an input."
  >
    <SwPlayground :props-config="playgroundConfig" component-name="SwLabel">
      <template #default="{ values }">
        <SwLabel :size="values.size" :uppercase="values.uppercase" :required="values.required">
          {{ values._content }}
        </SwLabel>
      </template>
    </SwPlayground>
  </SwPage>
</template>
