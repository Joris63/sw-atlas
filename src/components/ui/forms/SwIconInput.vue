<script setup lang="ts">
import { computed, ref } from 'vue'
import * as icons from 'lucide-vue-next'
import {
  ComboboxRoot,
  ComboboxControl,
  ComboboxInput,
  ComboboxClearTrigger,
  ComboboxPositioner,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxItemText,
  createListCollection,
  type ComboboxInputValueChangeDetails,
  type ComboboxValueChangeDetails,
} from '@ark-ui/vue'
import SwIcon from '../SwIcon.vue'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [string] }>()

// Build kebab-case name list once — skip non-icon exports
const allNames: string[] = Object.keys(icons)
  .filter((k) => /^[A-Z]/.test(k))
  .map((k) =>
    k.replace(/([A-Z])/g, (m, l, offset) =>
      offset === 0 ? l.toLowerCase() : `-${l.toLowerCase()}`,
    ),
  )

const query = ref(props.modelValue ?? '')

const filteredNames = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return allNames.slice(0, 48)
  return allNames.filter((n) => n.includes(q)).slice(0, 48)
})

const collection = computed(() =>
  createListCollection({
    items: filteredNames.value,
    itemToValue: (item) => item,
    itemToString: (item) => item,
  }),
)

const hasValidIcon = computed(() => allNames.includes(query.value.trim()))

function onInputValueChange(details: ComboboxInputValueChangeDetails) {
  query.value = details.inputValue
}

function onValueChange(details: ComboboxValueChangeDetails) {
  const selected = details.value[0] ?? ''
  emit('update:modelValue', selected)
}
</script>

<template>
  <ComboboxRoot
    class="sw-icon-input"
    :collection="collection"
    :model-value="modelValue ? [modelValue] : []"
    :input-value="query"
    :positioning="{ strategy: 'fixed', sameWidth: true }"
    allow-custom-value
    close-on-select
    @input-value-change="onInputValueChange"
    @value-change="onValueChange"
  >
    <ComboboxControl class="sw-icon-input__field">
      <!-- Current icon preview -->
      <span class="sw-icon-input__preview">
        <SwIcon v-if="hasValidIcon" :name="query" :size="14" />
        <SwIcon v-else name="image" :size="14" class="sw-icon-input__placeholder-icon" />
      </span>

      <ComboboxInput class="sw-icon-input__input" placeholder="Search icon…" />

      <ComboboxClearTrigger v-if="query" class="sw-icon-input__clear">
        <SwIcon name="x" :size="12" />
      </ComboboxClearTrigger>
    </ComboboxControl>

    <ComboboxPositioner class="sw-icon-input__positioner">
      <ComboboxContent class="sw-icon-input__dropdown">
        <ComboboxEmpty class="sw-icon-input__empty">No icons found</ComboboxEmpty>

        <div class="sw-icon-input__grid">
          <ComboboxItem
            v-for="name in filteredNames"
            :key="name"
            :item="name"
            class="sw-icon-input__item"
            :title="name"
          >
            <SwIcon :name="name" :size="16" />
            <ComboboxItemText class="sr-only">{{ name }}</ComboboxItemText>
          </ComboboxItem>
        </div>

        <div v-if="filteredNames.length === 48" class="sw-icon-input__hint">
          Showing first 48 — type to narrow down
        </div>
      </ComboboxContent>
    </ComboboxPositioner>
  </ComboboxRoot>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-icon-input {
  @apply relative flex-1 min-w-0;
}

/* ---- Input field ---- */
.sw-icon-input__field {
  @apply flex items-center gap-1.5 px-2.5 h-9 rounded-md
         bg-surface-strong border border-border
         transition-colors focus-within:border-border-focus;
}

.sw-icon-input__preview {
  @apply shrink-0 text-text-muted flex items-center;
}

.sw-icon-input__placeholder-icon {
  @apply opacity-30;
}

.sw-icon-input__input {
  @apply flex-1 min-w-0 bg-transparent text-sm text-text
         placeholder:text-text-subtle outline-none;
}

.sw-icon-input__clear {
  @apply shrink-0 text-text-subtle hover:text-text transition-colors cursor-pointer;
}

/* ---- Positioner — override Zag's inline z-index: var(--z-index) ---- */
.sw-icon-input__positioner {
  z-index: 50 !important;
}

/* ---- Dropdown ---- */
.sw-icon-input__dropdown {
  @apply bg-surface-strong border border-border rounded-xl shadow-md overflow-hidden;
}

.sw-icon-input__grid {
  @apply grid p-2 gap-0.5 overflow-y-auto
         grid-cols-[repeat(auto-fill,minmax(2rem,1fr))]
         max-h-48;
}

.sw-icon-input__item {
  @apply flex items-center justify-center rounded-md
         w-8 h-8 text-text-muted cursor-pointer
         transition-colors hover:bg-surface-subtle hover:text-text;
}

.sw-icon-input__item[data-highlighted] {
  @apply bg-surface-hover text-text;
}

.sw-icon-input__item[data-state='checked'] {
  @apply bg-primary-900 text-text-inverse;
}

.sw-icon-input__empty {
  @apply px-3 py-4 text-xs text-text-subtle text-center;
}

.sw-icon-input__hint {
  @apply px-3 py-1.5 text-[11px] text-text-subtle border-t border-border text-center;
}

.sr-only {
  @apply absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0;
  clip: rect(0, 0, 0, 0);
}
</style>
