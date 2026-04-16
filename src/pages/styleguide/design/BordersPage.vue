<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue'
import SwHeading from '@/components/ui/SwHeading.vue'
import SwText from '@/components/ui/SwText.vue'

const widths = [
  { token: 'border-0', value: '0px', usage: 'Remove a border (reset)' },
  { token: 'border-1', value: '1px', usage: 'Default — most UI elements' },
  { token: 'border-2', value: '2px', usage: 'Emphasis — selected state, focus ring' },
  { token: 'border-4', value: '4px', usage: '' },
]

const radii = [
  { token: 'rounded-sm', value: '0.25rem', px: '4px', usage: 'Badges, tags, chips' },
  { token: 'rounded-md', value: '0.375rem', px: '6px', usage: 'Buttons, input fields' },
  { token: 'rounded-lg', value: '0.5rem', px: '8px', usage: 'Dropdowns, small cards' },
  { token: 'rounded-xl', value: '0.75rem', px: '12px', usage: 'Cards, panels, modals' },
  { token: 'rounded-2xl', value: '1rem', px: '16px', usage: 'Feature cards, content areas' },
  { token: 'rounded-full', value: '9999px', px: '9999px', usage: 'Pills, avatars, icon buttons' },
]
</script>

<template>
  <SwPage
    title="Borders"
    description="Border width and radius tokens. Both scales are curated — only these values are available as utilities."
  >
    <!-- Border width -->
    <div class="sg-section">
      <div class="sg-section__header">
        <SwHeading :level="2" size="xl">Width</SwHeading>
        <SwText size="sm" color="muted"
          >Controls border thickness. Use
          <code class="inline-code">border-{n}</code> utilities.</SwText
        >
      </div>
      <div class="width-table">
        <div class="width-table__header">
          <span>Token</span>
          <span>Value</span>
          <span>When to use</span>
          <span>Visual</span>
        </div>
        <div v-for="w in widths" :key="w.token" class="width-row">
          <span class="width-row__token">{{ w.token }}</span>
          <span class="width-row__value">{{ w.value }}</span>
          <span class="width-row__usage">{{ w.usage }}</span>
          <div class="width-row__preview">
            <div class="width-row__box" :style="{ borderWidth: w.value }" />
          </div>
        </div>
      </div>
    </div>

    <!-- Border radius -->
    <div class="sg-section">
      <div class="sg-section__header">
        <SwHeading :level="2" size="xl">Radius</SwHeading>
        <SwText size="sm" color="muted"
          >Controls corner rounding. Use
          <code class="inline-code">rounded-{n}</code> utilities.</SwText
        >
      </div>
      <div class="radius-grid">
        <div v-for="r in radii" :key="r.token" class="radius-item">
          <div class="radius-item__preview">
            <div class="radius-item__box" :style="{ borderRadius: r.value }" />
          </div>
          <div class="radius-item__meta">
            <span class="radius-item__token">{{ r.token }}</span>
            <span class="radius-item__value">{{ r.value }} · {{ r.px }}</span>
            <span class="radius-item__usage">{{ r.usage }}</span>
          </div>
        </div>
      </div>
    </div>
  </SwPage>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sg-section {
  @apply flex flex-col gap-4;
}

.sg-section__header {
  @apply flex flex-col gap-1.5;
}

.inline-code {
  @apply text-sm rounded-sm px-1.5 py-0.5 font-mono text-primary-700 bg-primary-50;
}

/* Width table */
.width-table {
  @apply rounded-xl border border-border overflow-hidden;
}

.width-table__header {
  @apply grid px-5 py-2.5 text-xs font-semibold uppercase text-text-muted bg-surface-subtle border-b border-border tracking-wider gap-4;
  grid-template-columns: 8rem 1fr;
}

@media (min-width: 768px) {
  .width-table__header {
    grid-template-columns: 8rem 6rem 1fr 6rem;
  }
}

.width-row {
  @apply grid items-center px-5 py-3 border-b border-border last:border-0 bg-surface gap-4;
  grid-template-columns: 8rem 1fr;
}

@media (min-width: 768px) {
  .width-row {
    grid-template-columns: 8rem 6rem 1fr 6rem;
  }
}

.width-row__token {
  @apply text-sm font-mono font-medium text-text;
}
.width-row__value {
  @apply hidden md:block text-sm font-mono text-text-muted;
}
.width-row__usage {
  @apply text-xs text-text-muted italic;
}

.width-row__preview {
  @apply hidden md:flex items-center;
}

@media (max-width: 767px) {
  .width-table__header span:nth-child(2),
  .width-table__header span:nth-child(4) {
    display: none;
  }
}

.width-row__box {
  @apply w-16 h-8 rounded-md border-primary-400 bg-primary-50 border-solid;
}

/* Radius grid */
.radius-grid {
  @apply grid gap-4;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
}

.radius-item {
  @apply flex flex-col gap-3 p-5 rounded-xl border border-border bg-surface;
}

.radius-item__preview {
  @apply flex items-center justify-center h-20 rounded-lg bg-surface-subtle;
}

.radius-item__box {
  @apply w-14 h-14 bg-primary-400;
}

.radius-item__meta {
  @apply flex flex-col gap-0.5;
}

.radius-item__token {
  @apply text-sm font-mono font-medium text-text;
}
.radius-item__value {
  @apply text-xs font-mono text-text-muted;
}
.radius-item__usage {
  @apply text-xs text-text-muted italic mt-0.5;
}
</style>
