<script setup lang="ts">
import { ref } from 'vue';
import SwPage from '@/components/layout/SwPage.vue';
import SwTabs from '@/components/ui/SwTabs.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig, PlaygroundPreset } from '@/components/ui/docs/SwPlayground.vue';

const activeTab = ref('overview');

const tabPresets: PlaygroundPreset[] = [
  {
    label: 'Default',
    value: [
      { value: 'overview', label: 'Overview', badge: '' },
      { value: 'members', label: 'Members', badge: '' },
      { value: 'activity', label: 'Activity', badge: '' },
      { value: 'settings', label: 'Settings', badge: '' },
    ],
  },
  {
    label: 'With badges',
    value: [
      { value: 'overview', label: 'Overview', badge: '' },
      { value: 'members', label: 'Members', badge: '24' },
      { value: 'activity', label: 'Activity', badge: '3' },
      { value: 'settings', label: 'Settings', badge: '' },
    ],
  },
  {
    label: 'Three tabs',
    value: [
      { value: 'details', label: 'Details', badge: '' },
      { value: 'history', label: 'History', badge: '' },
      { value: 'notes', label: 'Notes', badge: '' },
    ],
  },
];

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'modelValue',
    type: 'string',
    description: 'The currently active tab value. Bind with v-model.',
    control: 'none',
  },
  {
    name: 'tabs',
    type: 'SwTab[]',
    description: 'Tab definitions. Each tab has a value, label, and optional badge.',
    control: 'preset',
    presets: tabPresets,
    initialValue: tabPresets[0]!.value,
  },
];
</script>

<template>
  <SwPage
    title="SwTabs"
    description="Underline-style tabs built on Ark UI. Content is rendered via named slots matching each tab's value."
  >
    <SwPlayground :props-config="playgroundConfig" component-name="SwTabs">
      <template #default="{ values }">
        <SwTabs
          :model-value="
            values.tabs.find((t: any) => t.value === activeTab)
              ? activeTab
              : (values.tabs[0]?.value ?? activeTab)
          "
          :tabs="values.tabs"
          class="w-full"
          @update:model-value="activeTab = $event"
        >
          <template v-for="tab in values.tabs" :key="tab.value" #[tab.value]>
            <p class="text-sm text-text-muted">Content for {{ tab.label }}</p>
          </template>
        </SwTabs>
      </template>
    </SwPlayground>
  </SwPage>
</template>
