<script setup lang="ts">
import { ref } from 'vue';
import SwPage from '@/components/layout/SwPage.vue';
import SwChip from '@/components/ui/display/SwChip.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue';

const selected = ref(false);
const visible = ref(true);

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'content',
    type: 'slot',
    description: 'Chip label text.',
    control: 'text',
    initialValue: 'Design',
    isSlotContent: true,
    category: 'content',
  },
  {
    name: 'variant',
    type: "'neutral' | 'primary' | 'success' | 'warning' | 'danger'",
    default: 'neutral',
    description: 'Color variant.',
    control: 'select',
    options: ['neutral', 'primary', 'success', 'warning', 'danger'],
    category: 'appearance',
  },
  {
    name: 'size',
    type: "'sm' | 'md'",
    default: 'md',
    description: 'Physical size.',
    control: 'select',
    options: ['sm', 'md'],
    category: 'appearance',
  },
  {
    name: 'icon',
    type: 'string',
    default: '',
    description: 'Lucide icon shown before the label.',
    control: 'icon',
    category: 'content',
  },
  {
    name: 'dot',
    type: 'boolean',
    default: false,
    description: 'Show a colored dot indicator.',
    control: 'toggle',
    category: 'appearance',
  },
  {
    name: 'animated',
    type: 'boolean',
    default: false,
    description: 'Pulse-animate the dot (requires dot=true).',
    control: 'toggle',
    showWhen: (v) => !!v.dot,
    category: 'appearance',
  },
  {
    name: 'selectable',
    type: 'boolean',
    default: false,
    description: 'Makes the chip a toggle button. Use v-model:selected for the state.',
    control: 'toggle',
    category: 'appearance',
  },
  {
    name: 'removable',
    type: 'boolean',
    default: false,
    description: 'Shows a remove (×) button that emits a remove event.',
    control: 'toggle',
    category: 'appearance',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: false,
    description: 'Disables interaction.',
    control: 'toggle',
    category: 'state',
  },
];
</script>

<template>
  <SwPage
    title="SwChip"
    description="Compact labels for status, categories, filters, and tags. Supports icons, dots, selection, and removal."
  >
    <SwPlayground :props-config="playgroundConfig" component-name="SwChip">
      <template #default="{ values }">
        <SwChip
          v-if="visible"
          v-model:selected="selected"
          :variant="values.variant"
          :size="values.size"
          :icon="values.icon || undefined"
          :dot="values.dot"
          :animated="values.animated"
          :selectable="values.selectable"
          :removable="values.removable"
          :disabled="values.disabled"
          @remove="visible = false"
        >
          {{ values.content }}
        </SwChip>
        <span v-else class="text-xs text-text-muted cursor-pointer" @click="visible = true">
          Removed — click to restore
        </span>
      </template>
    </SwPlayground>
  </SwPage>
</template>
