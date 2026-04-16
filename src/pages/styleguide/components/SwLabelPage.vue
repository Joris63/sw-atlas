<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue'
import SwExample from '@/components/ui/SwExample.vue'
import SwLabel from '@/components/ui/SwLabel.vue'
import SwPropsTable from '@/components/ui/SwPropsTable.vue'
import type { PropRow } from '@/components/ui/SwPropsTable.vue'

const propRows: PropRow[] = [
  {
    name: 'for',
    type: 'string',
    default: '—',
    description: "Associates the label with an input's id — passed as the HTML for attribute.",
  },
  { name: 'size', type: "'xs' | 'sm'", default: "'sm'", description: 'Font size.' },
  {
    name: 'uppercase',
    type: 'boolean',
    default: 'false',
    description:
      'Renders in uppercase with letter-spacing. Use for section headers, not form labels.',
  },
  {
    name: 'required',
    type: 'boolean',
    default: 'false',
    description: 'Appends a red asterisk (*) to signal a required field.',
  },
]

const basicCode = `<SwLabel for="email">Email address</SwLabel>
<SwLabel for="name" required>Full name</SwLabel>`

const uppercaseCode = `<SwLabel uppercase>Section header</SwLabel>
<SwLabel uppercase size="xs">Subsection</SwLabel>`
</script>

<template>
  <SwPage
    title="SwLabel"
    description="Form field labels and section headings. Use the for prop to associate with an input."
  >
    <div class="sg-section">
      <SwPropsTable :rows="propRows" />

      <SwExample title="Basic" :code="basicCode" preview-class="flex-col items-start gap-3">
        <SwLabel for="email">Email address</SwLabel>
        <SwLabel for="name" required>Full name</SwLabel>
      </SwExample>

      <SwExample title="Uppercase" :code="uppercaseCode" preview-class="flex-col items-start gap-3">
        <SwLabel uppercase>Section header</SwLabel>
        <SwLabel uppercase size="xs">Subsection</SwLabel>
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
