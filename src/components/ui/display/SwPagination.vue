<script setup lang="ts">
import { computed } from 'vue';
import {
  PaginationContext,
  PaginationEllipsis,
  PaginationFirstTrigger,
  PaginationItem,
  PaginationLastTrigger,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '@ark-ui/vue';
import SwIcon from './SwIcon.vue';
import SwButton from '../buttons/SwButton.vue';

interface Props {
  page: number;
  count: number;
  pageSize?: number;
  siblingCount?: number;
  variant?: 'default' | 'compact';
  size?: 'sm' | 'md';
  showInfo?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  pageSize: 20,
  siblingCount: 2,
  variant: 'default',
  size: 'md',
  showInfo: true,
});

const emit = defineEmits<{ 'update:page': [number] }>();

const rangeStart = computed(() => (props.page - 1) * props.pageSize + 1);
const rangeEnd = computed(() => Math.min(props.page * props.pageSize, props.count));
const iconSize = computed(() => (props.size === 'sm' ? 12 : 14));
const buttonSize = computed(() => (props.size === 'sm' ? 'xs' : 'sm'));

function goTo(n: number | null) {
  if (n !== null) {
    emit('update:page', n);
  }
}
</script>

<template>
  <PaginationRoot
    :count="count"
    :page="page"
    :page-size="pageSize"
    :sibling-count="siblingCount"
    @update:page="emit('update:page', $event)"
  >
    <PaginationContext v-slot="api">
      <!-- ── Default variant ──────────────────────────────────── -->
      <div v-if="variant === 'default'" class="sw-pagination" :class="`sw-pagination--${size}`">
        <span v-if="showInfo" class="sw-pagination__info">
          <slot name="range-label" :start="rangeStart" :end="rangeEnd" :count="count">
            Showing <strong>{{ rangeStart }}–{{ rangeEnd }}</strong> of
            <strong>{{ count.toLocaleString() }}</strong>
          </slot>
        </span>

        <nav class="sw-pagination__nav">
          <PaginationFirstTrigger class="sw-pagination__btn">
            <SwIcon name="chevrons-left" :size="iconSize" />
          </PaginationFirstTrigger>

          <PaginationPrevTrigger class="sw-pagination__btn">
            <SwIcon name="chevron-left" :size="iconSize" />
          </PaginationPrevTrigger>

          <template v-for="(item, i) in api.pages" :key="i">
            <PaginationItem
              v-if="item.type === 'page'"
              type="page"
              :value="item.value"
              class="sw-pagination__page"
            >
              {{ item.value }}
            </PaginationItem>
            <PaginationEllipsis v-else :index="i" class="sw-pagination__ellipsis">
              ···
            </PaginationEllipsis>
          </template>

          <PaginationNextTrigger class="sw-pagination__btn">
            <SwIcon name="chevron-right" :size="iconSize" />
          </PaginationNextTrigger>

          <PaginationLastTrigger class="sw-pagination__btn">
            <SwIcon name="chevrons-right" :size="iconSize" />
          </PaginationLastTrigger>
        </nav>
      </div>

      <!-- ── Compact variant ─────────────────────────────────────── -->
      <div v-else class="sw-pagination sw-pagination--compact" :class="`sw-pagination--${size}`">
        <span v-if="showInfo" class="sw-pagination__info">
          <slot name="range-label" :start="rangeStart" :end="rangeEnd" :count="count">
            Showing <strong>{{ rangeStart }}–{{ rangeEnd }}</strong> of
            <strong>{{ count.toLocaleString() }}</strong>
          </slot>
        </span>

        <div class="sw-pagination__compact-nav">
          <SwButton
            label="Previous"
            :disabled="api.previousPage === null"
            variant="plain"
            :size="buttonSize"
            icon-left="chevron-left"
            @click="goTo(api.previousPage)"
          />

          <span class="sw-pagination__page-label">
            <slot name="page-label" :page="api.page" :total-pages="api.totalPages">
              Page {{ api.page }} of {{ api.totalPages }}
            </slot>
          </span>

          <SwButton
            label="Next"
            :disabled="api.nextPage === null"
            variant="plain"
            :size="buttonSize"
            icon-right="chevron-right"
            @click="goTo(api.nextPage)"
          />
        </div>
      </div>
    </PaginationContext>
  </PaginationRoot>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

/* ── Shared ───────────────────────────────────────────────────── */
.sw-pagination {
  @apply flex items-center justify-between gap-4 flex-wrap select-none;
}

.sw-pagination__info {
  @apply text-sm text-text-muted;
}

.sw-pagination--sm .sw-pagination__info {
  @apply text-xs;
}

.sw-pagination__info :deep(strong) {
  @apply font-semibold text-text;
}

/* ── Default: numbered nav ────────────────────────────────────── */
.sw-pagination__nav {
  @apply flex items-center gap-0.5;
}

.sw-pagination__btn {
  @apply flex items-center justify-center w-8 h-8 rounded-md
         text-text-muted cursor-pointer
         hover:bg-surface-hover hover:text-text
         transition-colors duration-150;
}

.sw-pagination--sm .sw-pagination__btn {
  @apply w-7 h-7;
}

.sw-pagination__btn:disabled {
  @apply opacity-40 cursor-not-allowed pointer-events-none;
}

.sw-pagination__page {
  @apply flex items-center justify-center w-8 h-8 rounded-md
         text-sm font-medium text-primary cursor-pointer
         hover:bg-surface-hover
         transition-colors duration-150;
}

.sw-pagination--sm .sw-pagination__page {
  @apply w-7 h-7 text-xs;
}

.sw-pagination__page[data-selected] {
  @apply bg-primary text-text-on-primary;
}

.sw-pagination__ellipsis {
  @apply flex items-center justify-center w-8 h-8 text-sm text-text-muted cursor-default;
}

.sw-pagination--sm .sw-pagination__ellipsis {
  @apply w-7 h-7 text-xs;
}

/* ── Compact: prev/info/next ──────────────────────────────────── */
.sw-pagination--compact {
  @apply flex-wrap;
}

.sw-pagination__compact-nav {
  @apply flex items-center gap-4;
}

.sw-pagination__page-label {
  @apply text-sm text-text-muted;
}

.sw-pagination--sm .sw-pagination__page-label {
  @apply text-xs;
}
</style>
