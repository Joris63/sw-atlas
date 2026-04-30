<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue';
import SwAccordion from '@/components/ui/display/SwAccordion.vue';
import SwAccordionItem from '@/components/ui/display/SwAccordionItem.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig, PlaygroundPreset } from '@/components/ui/docs/SwPlayground.vue';

const ITEMS = [
  {
    value: 'api',
    title: 'API credentials',
    description:
      'Manage keys, rotate secrets, and scope access to specific environments. Each key can be revoked independently.',
  },
  {
    value: 'webhooks',
    title: 'Webhooks',
    description: 'Configure endpoints for event delivery.',
  },
  {
    value: 'security',
    title: 'Security & compliance',
    description: 'Review audit logs, manage SSO settings, and configure data retention policies.',
  },
  {
    value: 'members',
    title: 'Members & permissions',
    description: 'Invite team members, assign roles, and manage workspace access.',
  },
];

const itemPresets: PlaygroundPreset[] = [
  {
    label: 'Default',
    value: ITEMS.slice(0, 3).map((i) => ({ ...i, icon: '', disabled: false })),
  },
  {
    label: 'With icons',
    value: [
      { ...ITEMS[0], icon: 'key', disabled: false },
      { ...ITEMS[1], icon: 'webhook', disabled: false },
      { ...ITEMS[2], icon: 'shield-check', disabled: false },
    ],
  },
  {
    label: 'With disabled',
    value: [
      { ...ITEMS[0], icon: 'key', disabled: false },
      { ...ITEMS[1], icon: 'webhook', disabled: true },
      { ...ITEMS[2], icon: 'shield-check', disabled: true },
    ],
  },
  {
    label: 'Multiple open',
    value: [
      { ...ITEMS[0], icon: 'key', disabled: false },
      { ...ITEMS[1], icon: 'webhook', disabled: false },
      { ...ITEMS[2], icon: 'shield-check', disabled: false },
      { ...ITEMS[3], icon: 'users', disabled: false },
    ],
  },
];

const componentLabels = {
  root: 'SwAccordion',
  item: 'SwAccordionItem',
};

/* eslint-disable @typescript-eslint/no-explicit-any */
function customCode(values: Record<string, any>): string {
  const rootAttrs: string[] = [];
  // Multiple open has 4 items, while the rest has 3
  if (values.examples.length === 4) {
    rootAttrs.push('multiple');
  }

  const items = (values.examples ?? [])
    .map((item: Record<string, any>) => {
      const attrs: string[] = [`value="${String(item.value)}"`, `title="${String(item.title)}"`];
      if (item.icon) {
        attrs.push(`icon="${String(item.icon)}"`);
      }
      if (item.disabled) {
        attrs.push('disabled');
      }
      return `  <SwAccordionItem ${attrs.join(' ')}>\n    ...\n  </SwAccordionItem>`;
    })
    .join('\n');

  const rootStr = rootAttrs.length ? ` ${rootAttrs.join(' ')}` : '';
  return `<SwAccordion${rootStr}>\n${items}\n</SwAccordion>`;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const playgroundConfig: PlaygroundPropConfig[] = [
  // ── SwAccordion ──────────────────────────────────────
  {
    name: 'examples',
    description: 'Item configurations to display in the preview.',
    control: 'preset',
    presets: itemPresets,
    initialValue: itemPresets[0]?.value,
    component: 'root',
    category: 'playground',
  },
  {
    name: 'multiple',
    type: 'boolean',
    default: false,
    description: 'Allow multiple items to be open at the same time.',
    control: 'none',
    component: 'root',
    category: 'appearance',
  },
  {
    name: 'collapsible',
    type: 'boolean',
    default: true,
    description: 'Allow the open item to be collapsed by clicking it again.',
    control: 'none',
    initialValue: true,
    component: 'root',
    category: 'appearance',
  },
  {
    name: 'lazy',
    type: 'boolean',
    default: true,
    description: 'Defer mounting item content until the item is first opened.',
    control: 'none',
    initialValue: true,
    component: 'root',
    category: 'advanced',
  },

  // ── SwAccordionItem ───────────────────────────────────
  {
    name: 'examples',
    description: 'Item configurations to display in the preview.',
    control: 'preset',
    presets: itemPresets,
    initialValue: itemPresets[0]?.value,
    component: 'item',
    category: 'playground',
  },
  {
    name: 'value',
    type: 'string',
    description: 'Unique identifier for the item.',
    control: 'none',
    component: 'item',
    category: 'appearance',
  },
  {
    name: 'title',
    type: 'string',
    description: 'Label shown in the trigger row.',
    control: 'none',
    component: 'item',
    category: 'appearance',
  },
  {
    name: 'icon',
    type: 'string',
    description: 'Lucide icon name shown before the title.',
    control: 'none',
    component: 'item',
    category: 'appearance',
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'Prevents interaction and dims the item.',
    control: 'none',
    component: 'item',
    category: 'state',
  },
];
</script>

<template>
  <SwPage
    title="SwAccordion"
    description="A vertically stacked set of collapsible sections. Composed via SwAccordionItem slots."
  >
    <SwPlayground
      :props-config="playgroundConfig"
      :component-labels="componentLabels"
      :custom-code="customCode"
      component-name="SwAccordion"
    >
      <template #default="{ values }">
        <SwAccordion
          :multiple="values.examples.length === 4"
          :default-value="[values.examples[0]?.value]"
        >
          <SwAccordionItem
            v-for="item in values.examples"
            :key="item.value"
            :value="item.value"
            :title="item.title"
            :icon="item.icon || undefined"
            :disabled="item.disabled"
          >
            {{ item.description }}
          </SwAccordionItem>
        </SwAccordion>
      </template>
    </SwPlayground>
  </SwPage>
</template>
