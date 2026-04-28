<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue';
import SwTooltip from '@/components/ui/overlays/SwTooltip.vue';
import SwButton from '@/components/ui/buttons/SwButton.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue';

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'content',
    type: 'string',
    description: 'Text shown inside the tooltip. Also accepts a #content slot for rich content.',
    control: 'text',
    initialValue: 'More info',
    required: true,
    category: 'content',
  },
  {
    name: 'placement',
    type: "'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'",
    default: 'top',
    description: 'Preferred placement relative to the trigger.',
    control: 'select',
    options: [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'right',
      'right-start',
      'right-end',
    ],
    category: 'appearance',
  },
  {
    name: 'interactive',
    type: 'boolean',
    default: false,
    description:
      'Allow the pointer to move into the tooltip without it closing. Required for tooltips with links or buttons.',
    control: 'toggle',
    category: 'appearance',
  },
  {
    name: 'maxWidth',
    type: 'string',
    default: '16rem',
    description: 'Maximum width of the tooltip panel.',
    control: 'text',
    category: 'appearance',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: false,
    description: 'Suppresses the tooltip entirely.',
    control: 'toggle',
    category: 'state',
  },
  {
    name: 'openDelay',
    type: 'number',
    default: 400,
    description: 'Milliseconds before the tooltip opens.',
    control: 'select',
    options: ['0', '200', '400', '600', '1000'],
    initialValue: '400',
    isNumeric: true,
    category: 'advanced',
  },
  {
    name: 'closeDelay',
    type: 'number',
    default: 100,
    description: 'Milliseconds before the tooltip closes.',
    control: 'select',
    options: ['0', '100', '300', '500'],
    initialValue: '100',
    isNumeric: true,
    category: 'advanced',
  },
];
</script>

<template>
  <SwPage
    title="SwTooltip"
    description="A hover tooltip built on Ark UI. Wraps any trigger via the default slot."
  >
    <SwPlayground :props-config="playgroundConfig" component-name="SwTooltip">
      <template #default="{ values }">
        <SwTooltip
          :content="values.content"
          :placement="values.placement"
          :interactive="values.interactive"
          :max-width="values.maxWidth"
          :disabled="values.disabled"
          :open-delay="Number(values.openDelay)"
          :close-delay="Number(values.closeDelay)"
        >
          <SwButton label="Hover me" variant="outline" />
        </SwTooltip>
      </template>
    </SwPlayground>
  </SwPage>
</template>
