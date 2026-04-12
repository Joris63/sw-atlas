<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue'
import SwExample from '@/components/ui/SwExample.vue'
import SwIconButton from '@/components/ui/SwIconButton.vue'
import SwPropsTable from '@/components/ui/SwPropsTable.vue'
import type { PropRow } from '@/components/ui/SwPropsTable.vue'

const propRows: PropRow[] = [
  {
    name: 'label',
    type: 'string',
    required: true,
    description: 'Accessible label — rendered as aria-label. Always required.',
  },
  {
    name: 'icon',
    type: 'string',
    default: '—',
    description: 'Lucide icon name. If omitted, renders the default slot instead.',
  },
  {
    name: 'variant',
    type: "'primary' | 'outline' | 'ghost' | 'plain' | 'danger'",
    default: "'primary'",
    description: 'Visual style of the button.',
  },
  {
    name: 'size',
    type: "'2xs' | 'xs' | 'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Size of the button.',
  },
  {
    name: 'as',
    type: 'string',
    default: "'button'",
    description: 'HTML element or component to render as.',
  },
  {
    name: 'rounded',
    type: 'boolean',
    default: 'false',
    description: 'Fully round corners — use for pills and avatar-style buttons.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Prevents interaction and dims the button.',
  },
  {
    name: 'loading',
    type: 'boolean',
    default: 'false',
    description: 'Shows a spinner and disables the button.',
  },
]

const variantsCode = `<SwIconButton icon="pencil" label="Edit" variant="primary" />
<SwIconButton icon="pencil" label="Edit" variant="outline" />
<SwIconButton icon="pencil" label="Edit" variant="ghost" />
<SwIconButton icon="pencil" label="Edit" variant="plain" />
<SwIconButton icon="trash-2" label="Delete" variant="danger" />`

const sizesCode = `<SwIconButton icon="star" label="Star" size="2xs" variant="outline" />
<SwIconButton icon="star" label="Star" size="xs"  variant="outline" />
<SwIconButton icon="star" label="Star" size="sm"  variant="outline" />
<SwIconButton icon="star" label="Star" size="md"  variant="outline" />
<SwIconButton icon="star" label="Star" size="lg"  variant="outline" />`

const roundedCode = `<SwIconButton icon="plus"    label="Add"    variant="primary" rounded />
<SwIconButton icon="pencil"  label="Edit"   variant="outline" rounded />
<SwIconButton icon="x"       label="Close"  variant="ghost"   rounded />
<SwIconButton icon="trash-2" label="Delete" variant="danger"  rounded />`

const disabledCode = `<SwIconButton icon="pencil" label="Edit" variant="primary"  disabled />
<SwIconButton icon="pencil" label="Edit" variant="outline"  disabled />
<SwIconButton icon="pencil" label="Edit" variant="ghost"    disabled />
<SwIconButton icon="pencil" label="Edit" variant="plain"    disabled />
<SwIconButton icon="pencil" label="Edit" variant="danger"   disabled />`

const loadingCode = `<SwIconButton label="Saving" variant="primary" loading />
<SwIconButton label="Saving" variant="outline" loading />
<SwIconButton label="Saving" variant="danger"  loading />`
</script>

<template>
  <SwPage
    title="Icon Button"
    description="A square button that contains only an icon. Always provide a label prop for accessibility — it becomes the aria-label."
  >
    <div class="sg-section">
      <SwPropsTable :rows="propRows" />

      <SwExample title="Variants" :code="variantsCode" preview-class="items-end">
        <SwIconButton icon="pencil" label="Edit" variant="primary" />
        <SwIconButton icon="pencil" label="Edit" variant="outline" />
        <SwIconButton icon="pencil" label="Edit" variant="ghost" />
        <SwIconButton icon="pencil" label="Edit" variant="plain" />
        <SwIconButton icon="trash-2" label="Delete" variant="danger" />
      </SwExample>

      <SwExample title="Sizes" :code="sizesCode" preview-class="items-end">
        <SwIconButton icon="star" label="Star" size="2xs" variant="outline" />
        <SwIconButton icon="star" label="Star" size="xs" variant="outline" />
        <SwIconButton icon="star" label="Star" size="sm" variant="outline" />
        <SwIconButton icon="star" label="Star" size="md" variant="outline" />
        <SwIconButton icon="star" label="Star" size="lg" variant="outline" />
      </SwExample>

      <SwExample title="Rounded" :code="roundedCode">
        <SwIconButton icon="plus" label="Add" variant="primary" rounded />
        <SwIconButton icon="pencil" label="Edit" variant="outline" rounded />
        <SwIconButton icon="x" label="Close" variant="ghost" rounded />
        <SwIconButton icon="trash-2" label="Delete" variant="danger" rounded />
      </SwExample>

      <SwExample title="Disabled" :code="disabledCode">
        <SwIconButton icon="pencil" label="Edit" variant="primary" disabled />
        <SwIconButton icon="pencil" label="Edit" variant="outline" disabled />
        <SwIconButton icon="pencil" label="Edit" variant="ghost" disabled />
        <SwIconButton icon="pencil" label="Edit" variant="plain" disabled />
        <SwIconButton icon="pencil" label="Edit" variant="danger" disabled />
      </SwExample>

      <SwExample title="Loading" :code="loadingCode">
        <SwIconButton label="Saving" variant="primary" loading />
        <SwIconButton label="Saving" variant="outline" loading />
        <SwIconButton label="Saving" variant="danger" loading />
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
