<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue';
import SwLabel from '@/components/ui/typography/SwLabel.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue';

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'content',
    type: 'slot',
    description: 'Label text content.',
    control: 'text',
    initialValue: 'Email address',
    isSlotContent: true,
    category: 'content',
  },
  {
    name: 'size',
    type: "'xs' | 'sm'",
    default: 'sm',
    description: 'Font size.',
    control: 'select',
    options: ['xs', 'sm'],
    category: 'appearance',
  },
  {
    name: 'uppercase',
    type: 'boolean',
    default: false,
    description: 'Renders in uppercase with letter-spacing.',
    control: 'toggle',
    category: 'appearance',
  },
  {
    name: 'required',
    type: 'boolean',
    default: false,
    description: 'Appends a red asterisk (*) to signal a required field.',
    control: 'toggle',
    category: 'state',
  },
  {
    name: 'for',
    type: 'string',
    default: '',
    description: "Associates the label with an input's id.",
    control: 'none',
    category: 'advanced',
  },
];
</script>

<template>
  <SwPage
    title="SwLabel"
    description="Form field labels and section headings. Use the for prop to associate with an input."
  >
    <SwPlayground :props-config="playgroundConfig" component-name="SwLabel">
      <template #default="{ values }">
        <SwLabel :size="values.size" :uppercase="values.uppercase" :required="values.required">
          {{ values.content }}
        </SwLabel>
      </template>
    </SwPlayground>
  </SwPage>
</template>
