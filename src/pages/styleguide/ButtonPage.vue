<script setup lang="ts">
import SwExample from '@/components/ui/SwExample.vue'
import SwButton from '@/components/ui/SwButton.vue'
import SwPage from '@/components/layout/SwPage.vue'
import SwPropsTable from '@/components/ui/SwPropsTable.vue'
import type { PropRow } from '@/components/ui/SwPropsTable.vue'

const propRows: PropRow[] = [
  { name: 'label',       type: 'string',                                                required: true, description: 'Visible button text.' },
  { name: 'variant',     type: "'primary' | 'outline' | 'ghost' | 'plain' | 'danger'", default: "'primary'", description: 'Visual style of the button.' },
  { name: 'size',        type: "'2xs' | 'xs' | 'sm' | 'md' | 'lg'",                   default: "'md'",       description: 'Height and padding of the button.' },
  { name: 'as',          type: 'string',                                                default: "'button'",   description: 'HTML element or component to render as.' },
  { name: 'disabled',    type: 'boolean',                                               default: 'false',      description: 'Prevents interaction and dims the button.' },
  { name: 'loading',     type: 'boolean',                                               default: 'false',      description: 'Shows a spinner and disables the button.' },
  { name: 'loadingText', type: 'string',                                                default: '—',          description: 'Text shown next to the spinner while loading.' },
  { name: 'iconLeft',    type: 'string',                                                default: '—',          description: 'Lucide icon name to display before the label.' },
  { name: 'iconRight',   type: 'string',                                                default: '—',          description: 'Lucide icon name to display after the label.' },
]

const variantsCode = `<SwButton label="Primary" variant="primary" />
<SwButton label="Outline" variant="outline" />
<SwButton label="Ghost"   variant="ghost" />
<SwButton label="Plain"   variant="plain" />
<SwButton label="Danger"  variant="danger" />`

const sizesCode = `<SwButton label="2xs" size="2xs" />
<SwButton label="xs"  size="xs" />
<SwButton label="sm"  size="sm" />
<SwButton label="md"  size="md" />
<SwButton label="lg"  size="lg" />`

const iconLeftCode = `<SwButton label="Send"     icon-left="send" />
<SwButton label="Download" variant="outline" icon-left="download" />
<SwButton label="Add item" variant="ghost"   icon-left="plus" />
<SwButton label="Settings" variant="plain"   icon-left="settings" />
<SwButton label="Delete"   variant="danger"  icon-left="trash-2" />`

const iconRightCode = `<SwButton label="Continue" icon-right="arrow-right" />
<SwButton label="Open"     variant="outline" icon-right="external-link" />
<SwButton label="More"     variant="ghost"   icon-right="chevron-down" />`

const disabledCode = `<SwButton label="Primary" disabled />
<SwButton label="Outline" variant="outline" disabled />
<SwButton label="Ghost"   variant="ghost"   disabled />
<SwButton label="Plain"   variant="plain"   disabled />
<SwButton label="Danger"  variant="danger"  disabled />`

const loadingCode = `<SwButton label="Save"   loading loading-text="Saving…" />
<SwButton label="Load"   variant="outline" loading loading-text="Loading…" />
<SwButton label="Delete" variant="danger"  loading loading-text="Deleting…" />`
</script>

<template>

    <SwPage
      title="Button"
      description="Trigger actions and navigation. Supports multiple variants, sizes, icons, and states."
    >
      <div class="sg-section">
        <SwPropsTable :rows="propRows" />

        <SwExample title="Variants" :code="variantsCode">
          <SwButton label="Primary" variant="primary" />
          <SwButton label="Outline" variant="outline" />
          <SwButton label="Ghost"   variant="ghost" />
          <SwButton label="Plain"   variant="plain" />
          <SwButton label="Danger"  variant="danger" />
        </SwExample>

        <SwExample title="Sizes" :code="sizesCode" preview-class="items-end">
          <SwButton label="2xs" size="2xs" />
          <SwButton label="xs"  size="xs" />
          <SwButton label="sm"  size="sm" />
          <SwButton label="md"  size="md" />
          <SwButton label="lg"  size="lg" />
        </SwExample>

        <SwExample title="Icon left" :code="iconLeftCode">
          <SwButton label="Send"     icon-left="send" />
          <SwButton label="Download" variant="outline" icon-left="download" />
          <SwButton label="Add item" variant="ghost"   icon-left="plus" />
          <SwButton label="Settings" variant="plain"   icon-left="settings" />
          <SwButton label="Delete"   variant="danger"  icon-left="trash-2" />
        </SwExample>

        <SwExample title="Icon right" :code="iconRightCode">
          <SwButton label="Continue" icon-right="arrow-right" />
          <SwButton label="Open"     variant="outline" icon-right="external-link" />
          <SwButton label="More"     variant="ghost"   icon-right="chevron-down" />
        </SwExample>

        <SwExample title="Disabled" :code="disabledCode">
          <SwButton label="Primary" disabled />
          <SwButton label="Outline" variant="outline" disabled />
          <SwButton label="Ghost"   variant="ghost"   disabled />
          <SwButton label="Plain"   variant="plain"   disabled />
          <SwButton label="Danger"  variant="danger"  disabled />
        </SwExample>

        <SwExample title="Loading" :code="loadingCode">
          <SwButton label="Save"   loading loading-text="Saving…" />
          <SwButton label="Load"   variant="outline" loading loading-text="Loading…" />
          <SwButton label="Delete" variant="danger"  loading loading-text="Deleting…" />
        </SwExample>
      </div>
    </SwPage>

</template>

<style scoped>
@reference "../../styles/tailwind.css";

.sg-section {
  @apply flex flex-col gap-4;
}
</style>
