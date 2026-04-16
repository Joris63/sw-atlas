<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue'

const shadows = [
  { name: 'xs', token: 'shadow-xs', desc: 'Tooltips, badges, inline highlights' },
  { name: 'sm', token: 'shadow-sm', desc: 'Dropdowns, popovers, context menus' },
  { name: 'md', token: 'shadow-md', desc: 'Cards, sidebars, sticky headers' },
  { name: 'lg', token: 'shadow-lg', desc: 'Modals, drawers, dialogs' },
  { name: 'xl', token: 'shadow-xl', desc: 'Floating panels, command palettes' },
]
</script>

<template>
  <SwPage
    title="Schaduwen"
    description="Box shadows communicate elevation. Pick the level that matches how high the element floats above the page — don't mix levels in the same surface stack."
  >
    <div class="sg-section">
      <div class="shadow-grid">
        <div v-for="s in shadows" :key="s.name" class="shadow-item">
          <div class="shadow-item__box" :style="{ boxShadow: `var(--_shadow-${s.name})` }" />
          <div class="shadow-item__meta">
            <span class="shadow-item__token">{{ s.token }}</span>
            <span class="shadow-item__desc">{{ s.desc }}</span>
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

.shadow-grid {
  @apply grid gap-4;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
}

.shadow-item {
  @apply flex flex-col items-center gap-6 rounded-xl border border-border bg-surface-subtle px-6 py-10;
}

.shadow-item__box {
  @apply w-20 h-20 rounded-xl bg-surface-strong;
}

.shadow-item__meta {
  @apply flex flex-col gap-1 text-center;
}

.shadow-item__token {
  @apply text-sm font-mono font-medium text-text;
}
.shadow-item__desc {
  @apply text-xs text-text-muted;
}
</style>
