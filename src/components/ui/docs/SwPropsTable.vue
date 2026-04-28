<script setup lang="ts">
import { ref } from 'vue';
import SwIcon from '../SwIcon.vue';

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

const props = defineProps<{ rows: PropRow[]; label?: string; icon?: string }>();

const open = ref(false);
</script>

<template>
  <div class="sw-props-table">
    <button class="sw-props-table__toggle" :aria-expanded="open" @click="open = !open">
      <span class="sw-props-table__toggle-label">
        <SwIcon :name="props.icon ?? 'sliders-horizontal'" :size="14" />
        {{ props.label ?? 'Props' }}
        <span class="sw-props-table__count">{{ props.rows.length }}</span>
      </span>
      <SwIcon
        name="chevron-down"
        :size="14"
        class="sw-props-table__chevron"
        :class="{ 'sw-props-table__chevron--open': open }"
      />
    </button>

    <div class="sw-props-table__body" :class="{ 'sw-props-table__body--open': open }">
      <div class="sw-props-table__inner">
        <div class="sw-props-table__header">
          <span>Prop</span>
          <span>Type</span>
          <span>Default</span>
          <span>Description</span>
        </div>
        <div v-for="row in props.rows" :key="row.name" class="sw-props-table__row">
          <span class="sw-props-table__name">
            {{ row.name }}
            <span v-if="row.required" class="sw-props-table__required">required</span>
          </span>
          <span class="sw-props-table__type">{{ row.type }}</span>
          <span class="sw-props-table__default">{{ row.default ?? '—' }}</span>
          <span class="sw-props-table__desc">{{ row.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-props-table {
  @apply rounded-xl border border-border overflow-hidden;
}

.sw-props-table__toggle {
  @apply flex items-center justify-between w-full px-4 py-3
         text-sm font-medium text-text-muted bg-surface-subtle
         cursor-pointer select-none transition-colors duration-150;
}

.sw-props-table__toggle:hover {
  @apply bg-surface-hover text-text;
}

.sw-props-table__toggle-label {
  @apply flex items-center gap-2;
}

.sw-props-table__count {
  @apply inline-flex items-center justify-center
         rounded-full text-xs font-semibold px-1.5 min-w-5 h-5 bg-surface-hover text-text-muted;
}

.sw-props-table__chevron {
  @apply transition-transform duration-200;
}

.sw-props-table__chevron--open {
  @apply rotate-180;
}

/* Accordion body */
.sw-props-table__body {
  @apply grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-in-out;
}

.sw-props-table__body--open {
  @apply grid-rows-[1fr];
}

.sw-props-table__inner {
  @apply overflow-hidden;
}

/* Table */
.sw-props-table__header {
  @apply grid px-4 py-2 text-xs font-semibold uppercase text-text-muted
         bg-surface-subtle border-t border-border tracking-wider gap-4
         grid-cols-[8rem_1fr] md:grid-cols-[9rem_10rem_7rem_1fr];
}

.sw-props-table__row {
  @apply grid items-baseline px-4 py-3 text-sm
         border-t border-border bg-surface gap-4
         grid-cols-[8rem_1fr] md:grid-cols-[9rem_10rem_7rem_1fr];
}

.sw-props-table__row:last-child {
  @apply border-b-0;
}

.sw-props-table__name {
  @apply font-mono font-medium text-text flex items-center gap-1.5 flex-wrap;
}

.sw-props-table__required {
  @apply text-xs font-sans font-medium px-1.5 py-0.5 rounded-sm text-text-inverse bg-danger;
}

.sw-props-table__type {
  @apply hidden md:block font-mono text-xs text-primary-700 leading-relaxed wrap-break-word;
}

.sw-props-table__default {
  @apply hidden md:block font-mono text-xs text-text-muted;
}

/* Hide "Type" and "Default" header labels on mobile */
@media (max-width: 767px) {
  .sw-props-table__header span:nth-child(2),
  .sw-props-table__header span:nth-child(3) {
    @apply hidden;
  }
}

.sw-props-table__desc {
  @apply text-xs text-text-muted;
}
</style>
