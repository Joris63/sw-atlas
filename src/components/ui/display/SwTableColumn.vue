<script setup lang="ts">
import SwIcon from './SwIcon.vue';

interface Props {
  header?: boolean;
  sortable?: boolean;
  sortActive?: boolean;
  sortDir?: 'asc' | 'desc';
  width?: string;
  align?: 'left' | 'center' | 'right';
}

withDefaults(defineProps<Props>(), {
  header: false,
  sortable: false,
  sortActive: false,
  sortDir: 'asc',
  width: undefined,
  align: 'left',
});

defineEmits<{ sort: [] }>();

const ALIGN = { left: 'text-left', center: 'text-center', right: 'text-right' };
</script>

<template>
  <component
    :is="header ? 'th' : 'td'"
    :class="[
      header ? 'sw-table-col--header' : 'sw-table-col--cell',
      ALIGN[align],
    ]"
    :style="width ? { width } : undefined"
  >
    <button
      v-if="header && sortable"
      :class="['sw-table-col__sort', { 'sw-table-col__sort--active': sortActive }]"
      @click="$emit('sort')"
    >
      <slot />
      <SwIcon
        :name="sortActive ? (sortDir === 'asc' ? 'chevron-up' : 'chevron-down') : 'chevrons-up-down'"
        :size="11"
      />
    </button>
    <slot v-else />
  </component>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

/* ---- Header cell ---- */
.sw-table-col--header {
  @apply px-4 py-3 bg-surface-subtle border-b border-border
         text-xs font-semibold uppercase tracking-wider text-text-muted;
  vertical-align: middle;
}

/* ---- Body cell ---- */
.sw-table-col--cell {
  @apply px-4 py-3 text-sm text-text;
  vertical-align: middle;
}

/* ---- Sort button (inherits text styles from header cell) ---- */
.sw-table-col__sort {
  @apply flex items-center gap-1 text-xs uppercase tracking-wider
         hover:text-text transition-colors duration-150 cursor-pointer;
}

.sw-table-col__sort--active {
  @apply text-text;
}
</style>
