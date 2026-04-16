<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue'
import SwSwitch from '@/components/ui/SwSwitch.vue'
import SwPlayground from '@/components/ui/SwPlayground.vue'
import type { PlaygroundPropConfig } from '@/components/ui/SwPlayground.vue'

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'modelValue',
    type: 'boolean',
    default: false,
    description: 'Controlled checked state. Use v-model to bind.',
    control: 'toggle',
    initialValue: true,
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: 'md',
    description: 'Physical size of the switch track and thumb.',
    control: 'segmented',
    options: ['sm', 'md', 'lg'],
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: false,
    description: 'Prevents interaction and dims the switch.',
    control: 'toggle',
  },
]
</script>

<template>
  <SwPage
    title="SwSwitch"
    description="A toggle switch built on Ark UI. Use v-model to bind the checked state."
  >
    <SwPlayground :props-config="playgroundConfig" component-name="SwSwitch">
      <template #default="{ values }">
        <SwSwitch
          :model-value="values.modelValue"
          :size="values.size"
          :disabled="values.disabled"
          @update:model-value="values.modelValue = $event"
        />
      </template>
    </SwPlayground>
  </SwPage>
</template>
