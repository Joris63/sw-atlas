<script setup lang="ts">
import { ref } from 'vue';
import SwPage from '@/components/layout/SwPage.vue';
import SwTabs from '@/components/ui/display/SwTabs.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig, PlaygroundPreset } from '@/components/ui/docs/SwPlayground.vue';

const activeTab = ref('overview');

const tabPresets: PlaygroundPreset[] = [
  {
    label: 'Default',
    value: [
      { value: 'overview', label: 'Overview', badge: '', icon: '' },
      { value: 'members', label: 'Members', badge: '', icon: '' },
      { value: 'activity', label: 'Activity', badge: '', icon: '' },
      { value: 'settings', label: 'Settings', badge: '', icon: '' },
    ],
  },
  {
    label: 'With badges',
    value: [
      { value: 'overview', label: 'Overview', badge: '', icon: '' },
      { value: 'members', label: 'Members', badge: '24', icon: '' },
      { value: 'activity', label: 'Activity', badge: '3', icon: '' },
      { value: 'settings', label: 'Settings', badge: '', icon: '' },
    ],
  },
  {
    label: 'With icons',
    value: [
      { value: 'overview', label: 'Overview', badge: '', icon: 'layout-dashboard' },
      { value: 'members', label: 'Members', badge: '', icon: 'users' },
      { value: 'activity', label: 'Activity', badge: '', icon: 'activity' },
      { value: 'settings', label: 'Settings', badge: '', icon: 'settings' },
    ],
  },
  {
    label: 'Icons + badges',
    value: [
      { value: 'overview', label: 'Overview', badge: '', icon: 'layout-dashboard' },
      { value: 'members', label: 'Members', badge: '24', icon: 'users' },
      { value: 'activity', label: 'Activity', badge: '3', icon: 'activity' },
      { value: 'settings', label: 'Settings', badge: '', icon: 'settings' },
    ],
  },
  {
    label: 'With disabled',
    value: [
      { value: 'overview', label: 'Overview', badge: '', icon: '' },
      { value: 'members', label: 'Members', badge: '', icon: '' },
      { value: 'activity', label: 'Activity', badge: '', icon: '', disabled: true },
      { value: 'settings', label: 'Settings', badge: '', icon: '', disabled: true },
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
    description: 'Tab definitions. Each tab has a value, label, and optional icon and badge.',
    control: 'preset',
    presets: tabPresets,
    initialValue: tabPresets[0]?.value,
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: 'horizontal',
    description: 'Layout direction of the tab list.',
    control: 'select',
    options: ['horizontal', 'vertical'],
  },
  {
    name: 'lazy',
    type: 'boolean',
    default: false,
    description: 'Defer rendering tab content until the tab is first activated.',
    control: 'toggle',
  },
  {
    name: 'labelWidth',
    type: 'string',
    default: '10rem',
    description: 'Min-width of the vertical tab list column.',
    control: 'text',
    showWhen: (v) => v.orientation === 'vertical',
  },
];
</script>

<template>
  <SwPage
    title="SwTabs"
    description="Underline-style tabs built on Ark UI. Supports horizontal and vertical orientations, icons, and badges."
  >
    <SwPlayground :props-config="playgroundConfig" component-name="SwTabs" stacked>
      <template #default="{ values }">
        <SwTabs
          :model-value="
            values.tabs.find((t: any) => t.value === activeTab)
              ? activeTab
              : (values.tabs[0]?.value ?? activeTab)
          "
          :tabs="values.tabs"
          :orientation="values.orientation"
          :lazy="values.lazy"
          :label-width="values.labelWidth"
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
