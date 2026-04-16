<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue'
import SwExample from '@/components/ui/SwExample.vue'
import SwText from '@/components/ui/SwText.vue'
import SwPropsTable from '@/components/ui/SwPropsTable.vue'
import type { PropRow } from '@/components/ui/SwPropsTable.vue'

const propRows: PropRow[] = [
  {
    name: 'as',
    type: 'string',
    default: "'p'",
    description: 'HTML element to render as (e.g. span, div, li).',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'base' | 'lg' | 'xl'",
    default: "'base'",
    description: 'Font size.',
  },
  {
    name: 'weight',
    type: "'normal' | 'medium' | 'semibold'",
    default: "'normal'",
    description: 'Font weight.',
  },
  {
    name: 'color',
    type: "'default' | 'muted' | 'subtle' | 'inverse'",
    default: "'default'",
    description: 'Text color token. Use muted for secondary copy, subtle for placeholders.',
  },
]

const sizesCode = `<SwText size="xl">Extra large</SwText>
<SwText size="lg">Large</SwText>
<SwText size="base">Base (default)</SwText>
<SwText size="sm">Small</SwText>
<SwText size="xs">Extra small</SwText>`

const colorCode = `<SwText>Default</SwText>
<SwText color="muted">Muted</SwText>
<SwText color="subtle">Subtle</SwText>`

const weightCode = `<SwText weight="normal">Normal weight</SwText>
<SwText weight="medium">Medium weight</SwText>
<SwText weight="semibold">Semibold weight</SwText>`
</script>

<template>
  <SwPage
    title="SwText"
    description="Body copy rendered as a paragraph by default. Configurable size, color, and weight."
  >
    <div class="sg-section">
      <SwPropsTable :rows="propRows" />

      <SwExample title="Sizes" :code="sizesCode" preview-class="flex-col items-start gap-2">
        <SwText size="xl">Extra large</SwText>
        <SwText size="lg">Large</SwText>
        <SwText size="base">Base (default)</SwText>
        <SwText size="sm">Small</SwText>
        <SwText size="xs">Extra small</SwText>
      </SwExample>

      <SwExample title="Color" :code="colorCode" preview-class="flex-col items-start gap-2">
        <SwText>Default</SwText>
        <SwText color="muted">Muted</SwText>
        <SwText color="subtle">Subtle</SwText>
      </SwExample>
      <SwExample title="Weight" :code="weightCode" preview-class="flex-col items-start gap-2">
        <SwText weight="normal">Normal weight</SwText>
        <SwText weight="medium">Medium weight</SwText>
        <SwText weight="semibold">Semibold weight</SwText>
      </SwExample>
    </div>
  </SwPage>
</template>

<style scoped>
@reference "@/styles/tailwind.css";
.sg-section {
  @apply flex flex-col gap-4;
}
</style>
