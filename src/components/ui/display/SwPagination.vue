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
import SwIcon from '../SwIcon.vue';
import SwButton from '../buttons/SwButton.vue';

interface Props {
  page: number;
  count: number;
  pageSize?: number;
  siblingCount?: number;
  variant?: 'default' | 'compact';
}

const props = withDefaults(defineProps<Props>(), {
  pageSize: 20,
  siblingCount: 2,
  variant: 'default',
});

const emit = defineEmits<{ 'update:page': [number] }>();

const rangeStart = computed(() => (props.page - 1) * props.pageSize + 1);
const rangeEnd = computed(() => Math.min(props.page * props.pageSize, props.count));

function goTo(n: number | null) {
  if (n !== null) emit('update:page', n);
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
      <div v-if="variant === 'default'" class="sw-pagination">
        <div class="sw-pagination__header">
          <span class="sw-pagination__info">
            Showing <strong>{{ rangeStart }}–{{ rangeEnd }}</strong> of
            <strong>{{ count.toLocaleString() }}</strong>
          </span>

          <nav class="sw-pagination__nav">
            <PaginationFirstTrigger class="sw-pagination__btn">
              <SwIcon name="chevrons-left" :size="14" />
            </PaginationFirstTrigger>

            <PaginationPrevTrigger class="sw-pagination__btn">
              <SwIcon name="chevron-left" :size="14" />
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
              <SwIcon name="chevron-right" :size="14" />
            </PaginationNextTrigger>

            <PaginationLastTrigger class="sw-pagination__btn">
              <SwIcon name="chevrons-right" :size="14" />
            </PaginationLastTrigger>
          </nav>
        </div>
      </div>

      <!-- ── Compact variant ─────────────────────────────────────── -->
      <div v-else class="sw-pagination sw-pagination--compact">
        <span class="sw-pagination__info">
          Showing <strong>{{ rangeStart }}–{{ rangeEnd }}</strong> of
          <strong>{{ count.toLocaleString() }}</strong>
        </span>

        <div class="sw-pagination__compact-nav">
          <SwButton
            label="Previous"
            :disabled="api.previousPage === null"
            variant="plain"
            size="sm"
            icon-left="chevron-left"
            @click="goTo(api.previousPage)"
          />

          <span class="sw-pagination__footer-info">
            Page {{ api.page }} of {{ api.totalPages }}
          </span>

          <SwButton
            label="Next"
            :disabled="api.nextPage === null"
            variant="plain"
            size="sm"
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

.sw-pagination__info strong {
  @apply font-semibold text-text;
}

/* ── Default: numbered nav ────────────────────────────────────── */
.sw-pagination__header {
  @apply contents;
}

.sw-pagination__nav {
  @apply flex items-center gap-0.5;
}

.sw-pagination__btn {
  @apply flex items-center justify-center w-8 h-8 rounded-md
         text-text-muted cursor-pointer
         hover:bg-surface-hover hover:text-text
         transition-colors duration-150;
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

.sw-pagination__page[data-selected] {
  @apply bg-primary text-text-on-primary;
}

.sw-pagination__ellipsis {
  @apply flex items-center justify-center w-8 h-8 text-sm text-text-muted cursor-default;
}

/* ── Compact: prev/info/next ──────────────────────────────────── */
.sw-pagination--compact {
  @apply flex-wrap;
}

.sw-pagination__compact-nav {
  @apply flex items-center gap-4;
}

.sw-pagination__footer-info {
  @apply text-sm text-text-muted;
}
</style>
