<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue';
import SwAccordion from '@/components/ui/display/SwAccordion.vue';
import SwAccordionItem from '@/components/ui/display/SwAccordionItem.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue';

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'multiple',
    type: 'boolean',
    default: false,
    description: 'Allow multiple items to be open at the same time.',
    control: 'toggle',
    category: 'appearance',
  },
  {
    name: 'collapsible',
    type: 'boolean',
    default: true,
    description: 'Allow the open item to be collapsed by clicking it again.',
    control: 'toggle',
    initialValue: true,
    category: 'appearance',
  },
];
</script>

<template>
  <SwPage
    title="SwAccordion"
    description="A vertically stacked set of collapsible sections. Composed via SwAccordionItem slots."
  >
    <SwPlayground :props-config="playgroundConfig" component-name="SwAccordion">
      <template #default="{ values }">
        <SwAccordion
          :multiple="values.multiple"
          :collapsible="values.collapsible"
          :default-value="['api']"
        >
          <SwAccordionItem value="api" title="API credentials" icon="key">
            Manage keys, rotate secrets, and scope access to specific environments. Each key can be revoked independently.
          </SwAccordionItem>

          <SwAccordionItem value="webhooks" title="Webhooks" icon="webhook">
            Configure endpoints for event delivery.
          </SwAccordionItem>

          <SwAccordionItem value="security" title="Security & compliance" icon="shield-check">
            Review audit logs, manage SSO settings, and configure data retention policies.
          </SwAccordionItem>
        </SwAccordion>
      </template>
    </SwPlayground>
  </SwPage>
</template>
