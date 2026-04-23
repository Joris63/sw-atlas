<script setup lang="ts">
import { ref } from 'vue';
import SwPage from '@/components/layout/SwPage.vue';
import SwPagination from '@/components/ui/display/SwPagination.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue';

const page = ref(2);

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'page',
    type: 'number',
    description: 'The current active page. Bind with v-model:page.',
    control: 'none',
  },
  {
    name: 'count',
    type: 'number',
    description: 'Total number of items.',
    control: 'none',
  },
  {
    name: 'variant',
    type: "'default' | 'compact'",
    default: 'default',
    description: 'Layout variant. Default shows numbered pages; compact shows previous/next links only.',
    control: 'select',
    options: ['default', 'compact'],
    initialValue: 'default',
    category: 'appearance',
  },
  {
    name: 'pageSize',
    type: 'number',
    default: 20,
    description: 'Number of items per page.',
    control: 'select',
    options: ['10', '20', '50', '100'],
    initialValue: '20',
    category: 'appearance',
  },
  {
    name: 'siblingCount',
    type: 'number',
    default: 2,
    description: 'Number of page buttons shown on each side of the current page.',
    control: 'select',
    options: ['1', '2', '3'],
    initialValue: '1',
    category: 'appearance',
  },
];
</script>

<template>
  <SwPage
    title="SwPagination"
    description="Navigate between pages of data. The default variant shows numbered pages with ellipsis; the compact variant shows simple previous/next links."
  >
    <SwPlayground :props-config="playgroundConfig" component-name="SwPagination" stacked>
      <template #default="{ values }">
        <SwPagination
          v-model:page="page"
          :count="1284"
          :page-size="Number(values.pageSize)"
          :sibling-count="Number(values.siblingCount)"
          :variant="values.variant"
          class="w-full"
        />
      </template>
    </SwPlayground>
  </SwPage>
</template>
