<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue'
import SwExample from '@/components/ui/SwExample.vue'
import SwHeading from '@/components/ui/SwHeading.vue'
import SwPropsTable from '@/components/ui/SwPropsTable.vue'
import type { PropRow } from '@/components/ui/SwPropsTable.vue'

const propRows: PropRow[] = [
  {
    name: 'level',
    type: '1 | 2 | 3 | 4 | 5 | 6',
    default: '2',
    description:
      'Semantic HTML heading level (h1–h6). Does not affect visual size unless size is unset.',
  },
  {
    name: 'size',
    type: "'5xl' | '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'base' | 'sm'",
    default: 'auto',
    description: 'Visual size override. Defaults to a size mapped from level (h1→4xl, h2→3xl, …).',
  },
]

const levelsCode = `<SwHeading :level="1">Heading 1</SwHeading>
<SwHeading :level="2">Heading 2</SwHeading>
<SwHeading :level="3">Heading 3</SwHeading>
<SwHeading :level="4">Heading 4</SwHeading>
<SwHeading :level="5">Heading 5</SwHeading>
<SwHeading :level="6">Heading 6</SwHeading>`

const sizeCode = `<!-- Override the visual size while keeping semantic level -->
<SwHeading :level="2" size="5xl">Display heading</SwHeading>
<SwHeading :level="2" size="lg">Compact heading</SwHeading>`
</script>

<template>
  <SwPage
    title="SwHeading"
    description="Semantic headings h1–h6 with sensible default sizes. Override visually with the size prop without changing the HTML element."
  >
    <div class="sg-section">
      <SwPropsTable :rows="propRows" />

      <SwExample title="Levels" :code="levelsCode" preview-class="flex-col items-start gap-2">
        <SwHeading :level="1">Heading 1</SwHeading>
        <SwHeading :level="2">Heading 2</SwHeading>
        <SwHeading :level="3">Heading 3</SwHeading>
        <SwHeading :level="4">Heading 4</SwHeading>
        <SwHeading :level="5">Heading 5</SwHeading>
        <SwHeading :level="6">Heading 6</SwHeading>
      </SwExample>

      <SwExample title="Size override" :code="sizeCode" preview-class="flex-col items-start gap-3">
        <SwHeading :level="2" size="5xl">Display heading</SwHeading>
        <SwHeading :level="2" size="lg">Compact heading</SwHeading>
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
