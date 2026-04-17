<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue'
import SwInput from '@/components/ui/forms/SwInput.vue'
import SwPlayground from '@/components/ui/docs/SwPlayground.vue'
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue'

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'placeholder',
    type: 'string',
    default: '',
    description: 'Placeholder text shown when the input is empty.',
    control: 'text',
    initialValue: 'Enter text…',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: 'md',
    description: 'Height and font size of the input.',
    control: 'segmented',
    options: ['sm', 'md', 'lg'],
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: false,
    description: 'Prevents interaction and dims the input.',
    control: 'toggle',
  },
]
</script>

<template>
  <SwPage
    title="SwInput"
    description="A single-line text input built on Ark UI's Field. Use v-model to bind the value."
  >
    <SwPlayground :props-config="playgroundConfig" component-name="SwInput">
      <template #default="{ values }">
        <SwInput
          :placeholder="values.placeholder"
          :size="values.size"
          :disabled="values.disabled"
        />
      </template>
    </SwPlayground>
  </SwPage>
</template>
