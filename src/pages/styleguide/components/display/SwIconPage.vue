<script setup lang="ts">
import * as icons from 'lucide-vue-next';
import { ref, computed, watch } from 'vue';
import SwPage from '@/components/layout/SwPage.vue';
import SwIcon from '@/components/ui/SwIcon.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue';
import SwInput from '@/components/ui/forms/SwInput.vue';
import SwPagination from '@/components/ui/display/SwPagination.vue';

const selectedIcon = ref('star');

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'name',
    type: 'string',
    description: 'Lucide icon name in kebab-case (e.g. arrow-left).',
    control: 'icon',
    initialValue: 'star',
    required: true,
  },
  {
    name: 'size',
    type: 'number | string',
    description: 'Width and height in pixels.',
    control: 'select',
    options: ['16', '20', '24', '32', '48'],
    default: '20',
    initialValue: '20',
    isNumeric: true,
  },
  {
    name: 'strokeWidth',
    type: 'number | string',
    description: 'Stroke thickness.',
    control: 'select',
    options: ['1', '1.5', '1.75', '2', '2.5'],
    default: '1.75',
    initialValue: '1.75',
    isNumeric: true,
  },
];

const PAGE_SIZE = 108;

const allNames: string[] = Object.keys(icons)
  .filter((k) => /^[A-Z]/.test(k) && k !== 'Icon')
  .map((k) =>
    k.replace(/([A-Z])/g, (_m, l, offset) =>
      offset === 0 ? l.toLowerCase() : `-${l.toLowerCase()}`,
    ),
  )
  .filter((n) => !n.endsWith('-icon'));

const search = ref('');
const page = ref(1);
const copied = ref<string | null>(null);

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase();
  return q ? allNames.filter((n) => n.includes(q)) : allNames;
});

const paginated = computed(() => {
  const start = (page.value - 1) * PAGE_SIZE;
  const items = filtered.value.slice(start, start + PAGE_SIZE);
  // Pad to PAGE_SIZE so the grid height is always the same
  return [...items, ...Array<null>(PAGE_SIZE - items.length).fill(null)];
});

watch(search, () => {
  page.value = 1;
});

async function copyName(name: string) {
  await navigator.clipboard.writeText(name);
  copied.value = name;
  selectedIcon.value = name;
  setTimeout(() => {
    copied.value = null;
  }, 1500);
}
</script>

<template>
  <SwPage
    title="SwIcon"
    description="Renders any Lucide icon by kebab-case name. Backed by lucide-vue-next — over 1 400 icons available."
  >
    <SwPlayground
      :props-config="playgroundConfig"
      :overrides="{ name: selectedIcon }"
      component-name="SwIcon"
    >
      <template #default="{ values }">
        <SwIcon
          :name="values.name || 'star'"
          :size="Number(values.size)"
          :stroke-width="Number(values.strokeWidth)"
        />
      </template>
    </SwPlayground>

    <!-- Icon browser -->
    <div class="sw-icon-browser">
      <div class="sw-icon-browser__header">
        <div class="sw-icon-browser__meta">
          <span class="sw-icon-browser__count">{{ filtered.length.toLocaleString() }} icons</span>
          <span v-if="search" class="sw-icon-browser__query">matching "{{ search }}"</span>
        </div>
        <SwInput
          v-model="search"
          placeholder="Search icons…"
          size="sm"
          icon-left="search"
          class="sw-icon-browser__search"
        />
      </div>

      <div class="sw-icon-browser__grid">
        <template v-for="(name, i) in paginated" :key="i">
          <button
            v-if="name !== null"
            class="sw-icon-browser__item"
            :class="{
              'sw-icon-browser__item--copied': copied === name,
              'sw-icon-browser__item--selected': selectedIcon === name && copied !== name,
            }"
            :title="name"
            @click="copyName(name)"
          >
            <SwIcon :name="copied === name ? 'check' : name" :size="20" />
            <span class="sw-icon-browser__label">{{ name }}</span>
          </button>
          <div v-else class="sw-icon-browser__placeholder" />
        </template>
      </div>

      <p v-if="filtered.length === 0" class="sw-icon-browser__empty">
        No icons found for "{{ search }}"
      </p>

      <div v-if="filtered.length > 0" class="sw-icon-browser__footer">
        <SwPagination
          v-model:page="page"
          :count="filtered.length"
          :page-size="PAGE_SIZE"
          :sibling-count="1"
        />
      </div>
    </div>
  </SwPage>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-icon-browser {
  @apply mt-8 rounded-2xl border border-border overflow-hidden;
}

.sw-icon-browser__header {
  @apply flex items-center gap-4 px-4 py-3 bg-surface-subtle border-b border-border;
}

.sw-icon-browser__meta {
  @apply flex items-center gap-1.5 flex-1;
}

.sw-icon-browser__count {
  @apply text-xs font-semibold text-text-muted;
}

.sw-icon-browser__query {
  @apply text-xs text-text-subtle;
}

.sw-icon-browser__search {
  @apply w-[14rem] shrink-0;
}

.sw-icon-browser__search :deep(.sw-input__input) {
  @apply bg-surface;
}

.sw-icon-browser__grid {
  @apply grid p-3 gap-1 bg-surface
         grid-cols-[repeat(auto-fill,minmax(5rem,1fr))];
  grid-auto-rows: 5.5rem;
}

.sw-icon-browser__footer {
  @apply px-4 py-3 border-t border-border bg-surface-subtle;
}

.sw-icon-browser__item {
  @apply flex flex-col items-center justify-center gap-1.5 px-1 rounded-xl
         text-text-muted cursor-pointer select-none
         transition-colors hover:bg-surface-subtle hover:text-text;
}

.sw-icon-browser__item--selected {
  @apply text-primary bg-surface-subtle;
}

.sw-icon-browser__item--copied {
  @apply text-success bg-surface-subtle;
}

.sw-icon-browser__placeholder {
  pointer-events: none;
}

.sw-icon-browser__label {
  @apply text-[10px] leading-tight text-center break-all;
}

.sw-icon-browser__empty {
  @apply px-4 py-10 text-sm text-text-subtle text-center bg-surface;
}
</style>
