<script setup lang="ts">
import { ref } from 'vue';
import SwPage from '@/components/layout/SwPage.vue';
import SwCheckbox from '@/components/ui/forms/SwCheckbox.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue';

const checked = ref<boolean | 'indeterminate'>(true);

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'modelValue',
    type: "boolean | 'indeterminate'",
    description: 'Checked state of the checkbox. Bind with v-model.',
    control: 'none',
  },
  {
    name: 'label',
    type: 'string',
    default: '',
    description: 'Label text rendered next to the checkbox.',
    control: 'text',
    initialValue: 'Email me about product updates',
  },
  {
    name: 'hint',
    type: 'string',
    default: '',
    description: 'Small muted hint text shown inline after the label.',
    control: 'text',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: false,
    description: 'Prevents interaction and dims the checkbox.',
    control: 'toggle',
  },
];
</script>

<template>
  <SwPage
    title="SwCheckbox"
    description="A checkbox built on Ark UI. Supports checked, unchecked, and indeterminate states."
  >
    <SwPlayground :props-config="playgroundConfig" component-name="SwCheckbox">
      <template #default="{ values }">
        <SwCheckbox
          :model-value="checked"
          :label="values.label"
          :hint="values.hint"
          :disabled="values.disabled"
          @update:model-value="checked = $event"
        />
      </template>
    </SwPlayground>
  </SwPage>
</template>
