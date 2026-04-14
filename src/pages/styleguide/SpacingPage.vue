<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue'

const steps = [
  { name: '0', rem: '0rem', px: '0px', usage: 'Reset / remove spacing' },
  { name: '0.5', rem: '0.125rem', px: '2px', usage: 'Fine-grained offsets' },
  { name: '1', rem: '0.25rem', px: '4px', usage: 'Icon inner padding, tight insets' },
  { name: '1.5', rem: '0.375rem', px: '6px', usage: null },
  { name: '2', rem: '0.5rem', px: '8px', usage: 'Compact inline gaps' },
  { name: '2.5', rem: '0.625rem', px: '10px', usage: null },
  { name: '3', rem: '0.75rem', px: '12px', usage: 'Small component padding' },
  { name: '3.5', rem: '0.875rem', px: '14px', usage: null },
  { name: '4', rem: '1rem', px: '16px', usage: 'Standard gap, button padding' },
  { name: '5', rem: '1.25rem', px: '20px', usage: null },
  { name: '6', rem: '1.5rem', px: '24px', usage: 'Card padding, section gaps' },
  { name: '7', rem: '1.75rem', px: '28px', usage: null },
  { name: '8', rem: '2rem', px: '32px', usage: 'Large section padding' },
  { name: '9', rem: '2.25rem', px: '36px', usage: null },
  { name: '10', rem: '2.5rem', px: '40px', usage: null },
  { name: '12', rem: '3rem', px: '48px', usage: 'Layout-level gaps' },
  { name: '14', rem: '3.5rem', px: '56px', usage: null },
  { name: '16', rem: '4rem', px: '64px', usage: 'Page gutters, large containers' },
  { name: '20', rem: '5rem', px: '80px', usage: null },
  { name: '24', rem: '6rem', px: '96px', usage: 'Hero section padding' },
  { name: '32', rem: '8rem', px: '128px', usage: null },
  { name: '40', rem: '10rem', px: '160px', usage: null },
  { name: '48', rem: '12rem', px: '192px', usage: null },
  { name: '64', rem: '16rem', px: '256px', usage: null },
  { name: '80', rem: '20rem', px: '320px', usage: null },
  { name: '96', rem: '24rem', px: '384px', usage: null },
]

</script>

<template>
  <SwPage
    title="Spacing"
    description="The spacing scale used for padding, margin, gap, width, height, and more. Based on a 4px base unit."
  >
    <div class="sg-section">
      <div class="spacing-table">
        <div class="spacing-table__header">
          <span>Token</span>
          <span>rem</span>
          <span>px</span>
          <span>When to use</span>
          <span>Visual</span>
        </div>
        <div v-for="s in steps" :key="s.name" class="spacing-row">
          <span class="spacing-row__name">{{ s.name }}</span>
          <span class="spacing-row__rem">{{ s.rem }}</span>
          <span class="spacing-row__px">{{ s.px }}</span>
          <span class="spacing-row__usage">{{ s.usage ?? '' }}</span>
          <div class="spacing-row__bar-track">
            <div
              class="spacing-row__bar"
              :style="{ width: s.rem }"
            />
          </div>
        </div>
      </div>
    </div>
  </SwPage>
</template>

<style scoped>
@reference "../../styles/tailwind.css";

.sg-section {
  @apply flex flex-col gap-4;
}

.spacing-table {
  @apply rounded-xl border border-border overflow-hidden;
}

.spacing-table__header {
  @apply grid px-5 py-2.5 text-xs font-semibold uppercase text-text-muted bg-surface-subtle border-b border-border tracking-wider gap-4;
  grid-template-columns: 5rem 5rem 1fr;
}

@media (min-width: 768px) {
  .spacing-table__header {
    grid-template-columns: 5rem 6rem 5rem 1fr;
  }
}

@media (min-width: 1280px) {
  .spacing-table__header {
    grid-template-columns: 5rem 6rem 5rem 1fr minmax(0, 24rem);
  }
}

.spacing-row {
  @apply grid items-center px-5 py-2.5 border-b border-border last:border-0 bg-surface gap-4;
  grid-template-columns: 5rem 5rem 1fr;
}

@media (min-width: 768px) {
  .spacing-row {
    grid-template-columns: 5rem 6rem 5rem 1fr;
  }
}

@media (min-width: 1280px) {
  .spacing-row {
    grid-template-columns: 5rem 6rem 5rem 1fr minmax(0, 24rem);
  }
}

.spacing-row__name {
  @apply text-sm font-mono font-medium text-text;
}
.spacing-row__rem {
  @apply hidden md:block text-sm font-mono text-text-muted;
}
.spacing-row__px {
  @apply text-sm font-mono text-text-muted;
}
.spacing-row__usage {
  @apply hidden md:block text-xs text-text-muted italic;
}

@media (max-width: 767px) {
  .spacing-table__header span:nth-child(2),
  .spacing-table__header span:nth-child(4),
  .spacing-table__header span:nth-child(5) {
    display: none;
  }
}

@media (min-width: 768px) and (max-width: 1279px) {
  .spacing-table__header span:nth-child(5) {
    display: none;
  }
}

.spacing-row__bar-track {
  @apply hidden xl:block h-4 rounded-sm overflow-hidden min-w-0 bg-surface-subtle;
}

.spacing-row__bar {
  @apply h-full rounded-sm bg-primary-400;
  max-width: 100%;
}
</style>
