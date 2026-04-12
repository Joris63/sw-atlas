<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue'
import SwExample from '@/components/ui/SwExample.vue'
import SwText from '@/components/ui/SwText.vue'
import SwCode from '@/components/ui/SwCode.vue'
import SwPropsTable from '@/components/ui/SwPropsTable.vue'
import type { PropRow } from '@/components/ui/SwPropsTable.vue'

const propRows: PropRow[] = [
  { name: 'block', type: 'boolean', default: 'false', description: 'Renders as a block element with larger padding. Use for standalone code snippets rather than inline.' },
]

const inlineCode = `<SwText>Use <SwCode>bg-primary</SwCode> for the brand background color.</SwText>
<SwText>Set <SwCode>variant="outline"</SwCode> for a bordered button.</SwText>`
</script>

<template>

    <SwPage title="SwCode" description="Inline code snippets for use within body text.">
      <div class="sg-section">
        <SwPropsTable :rows="propRows" />

        <SwExample title="Inline" :code="inlineCode" preview-class="flex-col items-start gap-3">
          <SwText>Use <SwCode>bg-primary</SwCode> for the brand background color.</SwText>
          <SwText>Set <SwCode>variant="outline"</SwCode> for a bordered button.</SwText>
        </SwExample>
      </div>
    </SwPage>

</template>

<style scoped>
@reference "../../styles/tailwind.css";
.sg-section { @apply flex flex-col gap-4; }
</style>
