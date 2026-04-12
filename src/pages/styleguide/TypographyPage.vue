<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue'

const sizes = [
  { name: 'xs',   px: '12px', rem: '0.75rem', usage: 'Captions, metadata, badges' },
  { name: 'sm',   px: '14px', rem: '0.875rem', usage: 'Labels, helper text, table cells' },
  { name: 'base', px: '16px', rem: '1rem',     usage: 'Default body copy' },
  { name: 'lg',   px: '18px', rem: '1.125rem', usage: 'Lead paragraphs, emphasized body' },
  { name: 'xl',   px: '20px', rem: '1.25rem',  usage: 'Minor subheadings (h5/h6)' },
  { name: '2xl',  px: '24px', rem: '1.5rem',   usage: 'Section subheadings (h4)' },
  { name: '3xl',  px: '30px', rem: '1.875rem', usage: 'Page section headings (h3)' },
  { name: '4xl',  px: '36px', rem: '2.25rem',  usage: 'Primary page heading (h1/h2)' },
  { name: '5xl',  px: '48px', rem: '3rem',     usage: 'Display / hero heading' },
]
</script>

<template>

    <SwPage title="Typografie" description="The underlying font size scale. All typography components are built on these steps.">
      <div class="type-scale">
        <div class="type-header">
          <span>Token</span>
          <span>Size</span>
          <span>When to use</span>
          <span>Sample</span>
        </div>
        <div v-for="s in sizes" :key="s.name" class="type-row">
          <div class="type-row__meta">
            <span class="type-row__name">text-{{ s.name }}</span>
          </div>
          <span class="type-row__value">{{ s.px }} / {{ s.rem }}</span>
          <span class="type-row__usage">{{ s.usage }}</span>
          <p class="type-row__sample" :style="{ fontSize: s.rem }">
            The quick brown fox
          </p>
        </div>
      </div>
    </SwPage>

</template>

<style scoped>
@reference "../../styles/tailwind.css";

.type-scale {
  @apply flex flex-col divide-y border border-border rounded-xl overflow-hidden;
}

.type-header {
  @apply grid px-5 py-2.5 text-xs font-semibold uppercase text-text-muted bg-surface-subtle border-b border-border gap-4 tracking-wider;
  grid-template-columns: 7rem 8rem 1fr 1fr;
}

.type-row {
  @apply grid items-center px-5 py-3 bg-surface gap-4;
  grid-template-columns: 7rem 8rem 1fr 1fr;
}

.type-row__meta {
  @apply flex flex-col gap-0.5 shrink-0;
}

.type-row__name   { @apply text-xs font-mono font-medium text-text; }
.type-row__value  { @apply text-xs font-mono text-text-muted; }
.type-row__usage  { @apply text-xs text-text-muted italic; }
.type-row__sample { @apply text-text truncate; }
</style>
