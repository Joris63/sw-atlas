<script setup lang="ts">
import { computed, ref } from 'vue';
import SwPage from '@/components/layout/SwPage.vue';
import SwTable from '@/components/ui/display/SwTable.vue';
import SwTableRow from '@/components/ui/display/SwTableRow.vue';
import SwTableColumn from '@/components/ui/display/SwTableColumn.vue';
import SwAvatar from '@/components/ui/display/SwAvatar.vue';
import SwIcon from '@/components/ui/display/SwIcon.vue';
import SwChip from '@/components/ui/display/SwChip.vue';
import SwCheckbox from '@/components/ui/forms/SwCheckbox.vue';
import SwSkeleton from '@/components/ui/feedback/SwSkeleton.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue';

// ---- Shared data ----
const STATUS_VARIANT: Record<string, 'neutral' | 'success' | 'warning' | 'danger'> = {
  Active: 'success',
  Archived: 'neutral',
  'On leave': 'warning',
};

const ROWS = [
  { id: '1', name: 'Alice Chen',   role: 'Product Designer',    status: 'Active',   joined: 'Apr 12, 2026' },
  { id: '2', name: 'Jordan Blake', role: 'UX Researcher',       status: 'Archived', joined: 'Dec 14, 2025' },
  { id: '3', name: 'Marcus Webb',  role: 'Frontend Engineer',   status: 'Active',   joined: 'Mar 28, 2026' },
  { id: '4', name: 'Priya Nair',   role: 'Engineering Manager', status: 'On leave', joined: 'Jan 5, 2026'  },
  { id: '5', name: 'Sofia Torres', role: 'Data Analyst',        status: 'Active',   joined: 'Feb 2, 2026'  },
];

const COLUMNS = ['name', 'role', 'status', 'joined'] as const;

// ---- Sorting ----
const sortKey = ref<string>('name');
const sortDir = ref<'asc' | 'desc'>('asc');

function handleSort(key: string) {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortDir.value = 'asc';
  }
}

const sortedRows = computed(() =>
  [...ROWS].sort((a, b) => {
    const valA = a[sortKey.value as keyof typeof a] ?? '';
    const valB = b[sortKey.value as keyof typeof b] ?? '';
    const cmp = String(valA).localeCompare(String(valB));
    return sortDir.value === 'asc' ? cmp : -cmp;
  }),
);

// ---- Selection ----
const selection = ref<Set<string>>(new Set());

const allSelected = computed(() => ROWS.every((r) => selection.value.has(r.id)));
const someSelected = computed(() => !allSelected.value && ROWS.some((r) => selection.value.has(r.id)));
const headerCheck = computed<boolean | 'indeterminate'>(() => {
  if (allSelected.value) {
    return true;
  }
  if (someSelected.value) {
    return 'indeterminate';
  }
  return false;
});

function toggleAll() {
  if (allSelected.value) {
    selection.value = new Set();
  } else {
    selection.value = new Set(ROWS.map((r) => r.id));
  }
}

function toggleRow(id: string) {
  const next = new Set(selection.value);
  if (next.has(id)) {
    next.delete(id);
  } else {
    next.add(id);
  }
  selection.value = next;
}

// ---- Expanded rows ----
const expandedId = ref<string | null>(null);

function toggleExpand(id: string) {
  expandedId.value = expandedId.value === id ? null : id;
}

// ---- Code snippets per example ----
/* eslint-disable @typescript-eslint/no-explicit-any */
function customCode(values: Record<string, any>): string {
  switch (values.example) {
    case 'selectable':
      return `<SwTable>
  <template #head>
    <SwTableRow>
      <SwTableColumn header width="3rem">
        <SwCheckbox :model-value="headerCheck" @update:model-value="toggleAll" />
      </SwTableColumn>
      <SwTableColumn header>Name</SwTableColumn>
      <SwTableColumn header>Role</SwTableColumn>
      <SwTableColumn header>Status</SwTableColumn>
    </SwTableRow>
  </template>
  <SwTableRow
    v-for="row in rows"
    :key="row.id"
    clickable
    :selected="selection.has(row.id)"
    @click="toggleRow(row.id)"
  >
    <SwTableColumn width="3rem" @click.stop>
      <SwCheckbox :model-value="selection.has(row.id)" />
    </SwTableColumn>
    <SwTableColumn>{{ row.name }}</SwTableColumn>
    <SwTableColumn>{{ row.role }}</SwTableColumn>
    <SwTableColumn>
      <SwChip>{{ row.status }}</SwChip>
    </SwTableColumn>
  </SwTableRow>
</SwTable>`;

    case 'sortable':
      return `<SwTable>
  <template #head>
    <SwTableRow>
      <SwTableColumn
        v-for="col in columns"
        :key="col"
        header
        sortable
        :sort-active="sortKey === col"
        :sort-dir="sortDir"
        @sort="handleSort(col)"
      >
        {{ col }}
      </SwTableColumn>
    </SwTableRow>
  </template>
  <SwTableRow v-for="row in sortedRows" :key="row.id">
    <SwTableColumn>{{ row.name }}</SwTableColumn>
    <SwTableColumn>{{ row.role }}</SwTableColumn>
    <SwTableColumn>{{ row.status }}</SwTableColumn>
    <SwTableColumn>{{ row.joined }}</SwTableColumn>
  </SwTableRow>
</SwTable>`;

    case 'expandable':
      return `<SwTable>
  <template #head>
    <SwTableRow>
      <SwTableColumn header width="2.5rem" />
      <SwTableColumn header>Name</SwTableColumn>
      <SwTableColumn header>Role</SwTableColumn>
      <SwTableColumn header>Status</SwTableColumn>
    </SwTableRow>
  </template>
  <template v-for="row in rows" :key="row.id">
    <SwTableRow clickable @click="toggleExpand(row.id)">
      <SwTableColumn width="2.5rem">
        <SwIcon name="chevron-right" :size="14" />
      </SwTableColumn>
      <SwTableColumn>{{ row.name }}</SwTableColumn>
      <SwTableColumn>{{ row.role }}</SwTableColumn>
      <SwTableColumn>{{ row.status }}</SwTableColumn>
    </SwTableRow>
    <tr v-if="expandedId === row.id">
      <td colspan="4">Expanded content for {{ row.name }}</td>
    </tr>
  </template>
</SwTable>`;

    case 'loading':
      return `<SwTable>
  <template #head>
    <SwTableRow>
      <SwTableColumn header>Name</SwTableColumn>
      <SwTableColumn header>Role</SwTableColumn>
      <SwTableColumn header>Status</SwTableColumn>
      <SwTableColumn header>Joined</SwTableColumn>
    </SwTableRow>
  </template>
  <SwTableRow v-for="n in 5" :key="n">
    <SwTableColumn>
      <SwSkeleton width="1.5rem" height="1.5rem" rounded="full" />
    </SwTableColumn>
    <SwTableColumn><SwSkeleton width="8rem" height="0.875rem" /></SwTableColumn>
    <SwTableColumn><SwSkeleton width="4rem" height="1.25rem" rounded="full" /></SwTableColumn>
    <SwTableColumn><SwSkeleton width="5rem" height="0.875rem" /></SwTableColumn>
  </SwTableRow>
</SwTable>`;

    default: // basic
      return `<SwTable>
  <template #head>
    <SwTableRow>
      <SwTableColumn header>Name</SwTableColumn>
      <SwTableColumn header>Role</SwTableColumn>
      <SwTableColumn header>Status</SwTableColumn>
      <SwTableColumn header>Joined</SwTableColumn>
    </SwTableRow>
  </template>
  <SwTableRow v-for="row in rows" :key="row.id">
    <SwTableColumn>{{ row.name }}</SwTableColumn>
    <SwTableColumn>{{ row.role }}</SwTableColumn>
    <SwTableColumn>
      <SwChip>{{ row.status }}</SwChip>
    </SwTableColumn>
    <SwTableColumn>{{ row.joined }}</SwTableColumn>
  </SwTableRow>
</SwTable>`;
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// ---- Playground ----
const componentLabels = {
  table: 'SwTable',
  row: 'SwTableRow',
  column: 'SwTableColumn',
};

const playgroundConfig: PlaygroundPropConfig[] = [
  // SwTable
  {
    name: 'example',
    description: 'Which composition to preview.',
    control: 'preset',
    presets: [
      { label: 'Basic',      value: 'basic'       },
      { label: 'Selectable', value: 'selectable'   },
      { label: 'Sortable',   value: 'sortable'     },
      { label: 'Expandable', value: 'expandable'   },
      { label: 'Loading',    value: 'loading'      },
    ],
    initialValue: 'basic',
    component: 'table',
    category: 'playground',
  },

  // SwTableRow
  {
    name: 'example',
    description: 'Which composition to preview.',
    control: 'preset',
    presets: [
      { label: 'Basic',      value: 'basic'       },
      { label: 'Selectable', value: 'selectable'   },
      { label: 'Sortable',   value: 'sortable'     },
      { label: 'Expandable', value: 'expandable'   },
      { label: 'Loading',    value: 'loading'      },
    ],
    initialValue: 'basic',
    component: 'row',
    category: 'playground',
  },
  {
    name: 'clickable',
    type: 'boolean',
    default: false,
    description: 'Adds a pointer cursor and hover background to the row.',
    control: 'none',
    component: 'row',
    category: 'appearance',
  },
  {
    name: 'selected',
    type: 'boolean',
    default: false,
    description: 'Applies the selected background tint. Typically controlled by your selection state.',
    control: 'none',
    component: 'row',
    category: 'state',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: false,
    description: 'Dims the row and disables pointer events.',
    control: 'none',
    component: 'row',
    category: 'state',
  },

  // SwTableColumn
  {
    name: 'example',
    description: 'Which composition to preview.',
    control: 'preset',
    presets: [
      { label: 'Basic',      value: 'basic'       },
      { label: 'Selectable', value: 'selectable'   },
      { label: 'Sortable',   value: 'sortable'     },
      { label: 'Expandable', value: 'expandable'   },
      { label: 'Loading',    value: 'loading'      },
    ],
    initialValue: 'basic',
    component: 'column',
    category: 'playground',
  },
  {
    name: 'header',
    type: 'boolean',
    default: false,
    description: 'Renders the cell as a <th> with header styling.',
    control: 'none',
    component: 'column',
    category: 'appearance',
  },
  {
    name: 'sortable',
    type: 'boolean',
    default: false,
    description: 'Renders a sort button inside the header cell.',
    control: 'none',
    component: 'column',
    category: 'appearance',
  },
  {
    name: 'sortActive',
    type: 'boolean',
    default: false,
    description: 'Highlights the sort button as the active column.',
    control: 'none',
    component: 'column',
    category: 'state',
  },
  {
    name: 'sortDir',
    type: "'asc' | 'desc'",
    default: 'asc',
    description: 'Direction of the active sort.',
    control: 'none',
    component: 'column',
    category: 'state',
  },
  {
    name: 'align',
    type: "'left' | 'center' | 'right'",
    default: 'left',
    description: 'Text alignment of the cell content.',
    control: 'none',
    component: 'column',
    category: 'appearance',
  },
  {
    name: 'width',
    type: 'string',
    default: '',
    description: 'Fixed width for the column (e.g. "8rem", "120px").',
    control: 'none',
    component: 'column',
    category: 'appearance',
  },
];
</script>

<template>
  <SwPage
    title="SwTable"
    description="A compound table built from SwTable, SwTableRow, and SwTableColumn. Fully composable — sorting, selection, and expansion are handled in your own template."
  >
    <SwPlayground
      :props-config="playgroundConfig"
      :component-labels="componentLabels"
      :custom-code="customCode"
      component-name="SwTable"
      stacked
    >
      <template #default="{ values }">

        <!-- ---- BASIC ---- -->
        <SwTable v-if="values.example === 'basic'">
          <template #head>
            <SwTableRow>
              <SwTableColumn header>Name</SwTableColumn>
              <SwTableColumn header>Role</SwTableColumn>
              <SwTableColumn header>Status</SwTableColumn>
              <SwTableColumn header>Joined</SwTableColumn>
            </SwTableRow>
          </template>
          <SwTableRow v-for="row in ROWS" :key="row.id">
            <SwTableColumn>
              <div class="sw-tp-name">
                <SwAvatar :name="row.name" size="xs" />
                <span class="sw-tp-name__label">{{ row.name }}</span>
              </div>
            </SwTableColumn>
            <SwTableColumn><span class="sw-tp-role">{{ row.role }}</span></SwTableColumn>
            <SwTableColumn>
              <SwChip :variant="STATUS_VARIANT[row.status] ?? 'neutral'" size="sm">{{ row.status }}</SwChip>
            </SwTableColumn>
            <SwTableColumn><span class="sw-tp-date">{{ row.joined }}</span></SwTableColumn>
          </SwTableRow>
        </SwTable>

        <!-- ---- SELECTABLE ---- -->
        <SwTable v-else-if="values.example === 'selectable'">
          <template #head>
            <SwTableRow>
              <SwTableColumn header width="3rem">
                <SwCheckbox :model-value="headerCheck" @update:model-value="toggleAll" />
              </SwTableColumn>
              <SwTableColumn header>Name</SwTableColumn>
              <SwTableColumn header>Role</SwTableColumn>
              <SwTableColumn header>Status</SwTableColumn>
            </SwTableRow>
          </template>
          <SwTableRow
            v-for="row in ROWS"
            :key="row.id"
            clickable
            :selected="selection.has(row.id)"
            @click="toggleRow(row.id)"
          >
            <SwTableColumn width="3rem" @click.stop>
              <div class="sw-tp-check">
                <SwCheckbox :model-value="selection.has(row.id)" @update:model-value="toggleRow(row.id)" />
              </div>
            </SwTableColumn>
            <SwTableColumn>
              <div class="sw-tp-name">
                <SwAvatar :name="row.name" size="xs" />
                <span class="sw-tp-name__label">{{ row.name }}</span>
              </div>
            </SwTableColumn>
            <SwTableColumn><span class="sw-tp-role">{{ row.role }}</span></SwTableColumn>
            <SwTableColumn>
              <SwChip :variant="STATUS_VARIANT[row.status] ?? 'neutral'" size="sm">{{ row.status }}</SwChip>
            </SwTableColumn>
          </SwTableRow>
        </SwTable>

        <!-- ---- SORTABLE ---- -->
        <SwTable v-else-if="values.example === 'sortable'">
          <template #head>
            <SwTableRow>
              <SwTableColumn
                v-for="col in COLUMNS"
                :key="col"
                header
                sortable
                :sort-active="sortKey === col"
                :sort-dir="sortDir"
                @sort="handleSort(col)"
              >
                {{ col }}
              </SwTableColumn>
            </SwTableRow>
          </template>
          <SwTableRow v-for="row in sortedRows" :key="row.id">
            <SwTableColumn>
              <div class="sw-tp-name">
                <SwAvatar :name="row.name" size="xs" />
                <span class="sw-tp-name__label">{{ row.name }}</span>
              </div>
            </SwTableColumn>
            <SwTableColumn><span class="sw-tp-role">{{ row.role }}</span></SwTableColumn>
            <SwTableColumn>
              <SwChip :variant="STATUS_VARIANT[row.status] ?? 'neutral'" size="sm">{{ row.status }}</SwChip>
            </SwTableColumn>
            <SwTableColumn><span class="sw-tp-date">{{ row.joined }}</span></SwTableColumn>
          </SwTableRow>
        </SwTable>

        <!-- ---- EXPANDABLE ---- -->
        <SwTable v-else-if="values.example === 'expandable'">
          <template #head>
            <SwTableRow>
              <SwTableColumn header width="2.5rem" />
              <SwTableColumn header>Name</SwTableColumn>
              <SwTableColumn header>Role</SwTableColumn>
              <SwTableColumn header>Status</SwTableColumn>
            </SwTableRow>
          </template>
          <template v-for="row in ROWS" :key="row.id">
            <SwTableRow clickable @click="toggleExpand(row.id)">
              <SwTableColumn width="2.5rem">
                <SwIcon
                  name="chevron-right"
                  :size="14"
                  class="sw-tp-chevron"
                  :class="{ 'sw-tp-chevron--open': expandedId === row.id }"
                />
              </SwTableColumn>
              <SwTableColumn>
                <div class="sw-tp-name">
                  <SwAvatar :name="row.name" size="xs" />
                  <span class="sw-tp-name__label">{{ row.name }}</span>
                </div>
              </SwTableColumn>
              <SwTableColumn><span class="sw-tp-role">{{ row.role }}</span></SwTableColumn>
              <SwTableColumn>
                <SwChip :variant="STATUS_VARIANT[row.status] ?? 'neutral'" size="sm">{{ row.status }}</SwChip>
              </SwTableColumn>
            </SwTableRow>
            <tr v-if="expandedId === row.id" class="sw-tp-expanded">
              <td colspan="4" class="sw-tp-expanded__cell">
                <p class="sw-tp-expanded__text">Joined on <strong>{{ row.joined }}</strong> — additional details about {{ row.name }} can go here.</p>
              </td>
            </tr>
          </template>
        </SwTable>

        <!-- ---- LOADING ---- -->
        <SwTable v-else-if="values.example === 'loading'">
          <template #head>
            <SwTableRow>
              <SwTableColumn header>Name</SwTableColumn>
              <SwTableColumn header>Role</SwTableColumn>
              <SwTableColumn header>Status</SwTableColumn>
              <SwTableColumn header>Joined</SwTableColumn>
            </SwTableRow>
          </template>
          <SwTableRow v-for="n in 5" :key="n">
            <SwTableColumn>
              <div class="sw-tp-name">
                <SwSkeleton width="1.5rem" height="1.5rem" rounded="full" />
                <SwSkeleton :width="`${100 + (n * 23) % 60}px`" height="0.875rem" />
              </div>
            </SwTableColumn>
            <SwTableColumn><SwSkeleton :width="`${80 + (n * 17) % 50}px`" height="0.875rem" /></SwTableColumn>
            <SwTableColumn><SwSkeleton width="4rem" height="1.25rem" rounded="full" /></SwTableColumn>
            <SwTableColumn><SwSkeleton width="5rem" height="0.875rem" /></SwTableColumn>
          </SwTableRow>
        </SwTable>

      </template>
    </SwPlayground>
  </SwPage>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-tp-name {
  @apply flex items-center gap-2.5;
}

.sw-tp-name__label {
  @apply font-medium text-primary;
}

.sw-tp-role {
  @apply text-primary;
}

.sw-tp-date {
  @apply text-text-muted font-mono text-xs;
}

.sw-tp-check {
  @apply flex items-center justify-center w-4 h-4;
}

.sw-tp-chevron {
  @apply text-text-muted transition-transform duration-150;
}

.sw-tp-chevron--open {
  @apply rotate-90;
}

.sw-tp-expanded {
  @apply bg-surface-subtle;
}

.sw-tp-expanded__cell {
  @apply px-4 py-3 border-b border-border;
  vertical-align: middle;
}

.sw-tp-expanded__text {
  @apply text-sm text-text-muted;
}
</style>
