<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue';
import SwSkeleton from '@/components/ui/feedback/SwSkeleton.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue';

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'examples',
    description: 'Which composition to preview.',
    control: 'preset',
    presets: [
      { value: 'profile', label: 'profile' },
      { value: 'article', label: 'article' },
      { value: 'list', label: 'list' },
    ],
    initialValue: 'profile',
    category: 'playground',
  },
  {
    name: 'rounded',
    type: "'sm' | 'md' | 'lg' | 'xl' | 'full' | string",
    default: 'md',
    description: 'Border radius applied to each skeleton block.',
    control: 'select',
    options: ['sm', 'md', 'lg', 'xl', 'full'],
    initialValue: 'md',
    category: 'appearance',
  },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
function customCode(values: Record<string, any>): string {
  const r = values.rounded ?? 'md';
  const rounded = (val: string) => (val !== 'md' ? ` rounded="${val}"` : '');

  if (values.examples === 'profile') {
    return `<div class="flex items-center gap-4">
  <SwSkeleton width="3rem" height="3rem"${rounded('full')} />
  <div class="flex flex-col gap-2 flex-1">
    <SwSkeleton width="9rem" height="0.875rem"${rounded(r)} />
    <SwSkeleton width="6rem" height="0.75rem"${rounded(r)} />
  </div>
</div>`;
  }

  if (values.examples === 'article') {
    return `<div class="flex flex-col gap-4 w-80">
  <SwSkeleton width="100%" height="10rem"${rounded(r)} />
  <div class="flex flex-col gap-2">
    <SwSkeleton width="75%"  height="1rem"${rounded(r)} />
    <SwSkeleton width="100%" height="0.875rem"${rounded(r)} />
    <SwSkeleton width="90%"  height="0.875rem"${rounded(r)} />
    <SwSkeleton width="50%"  height="0.875rem"${rounded(r)} />
  </div>
</div>`;
  }

  return `<div v-for="n in 4" :key="n" class="flex items-center gap-3 px-4 py-3">
  <SwSkeleton width="2rem" height="2rem"${rounded('full')} />
  <div class="flex flex-col gap-1.5 flex-1">
    <SwSkeleton width="70%" height="0.875rem"${rounded(r)} />
    <SwSkeleton width="40%" height="0.75rem"${rounded(r)} />
  </div>
  <SwSkeleton width="4rem" height="1.5rem"${rounded(r)} />
</div>`;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
</script>

<template>
  <SwPage
    title="SwSkeleton"
    description="Animated shimmer placeholders for content that is loading. Compose multiple SwSkeleton blocks to match the shape of the real UI."
  >
    <SwPlayground
      :props-config="playgroundConfig"
      component-name="SwSkeleton"
      :custom-code="customCode"
    >
      <template #default="{ values }">
        <!-- Profile composition -->
        <div v-if="values.examples === 'profile'" class="sw-sk-profile">
          <SwSkeleton
            width="3rem"
            height="3rem"
            :rounded="values.rounded === 'md' ? 'full' : values.rounded"
          />
          <div class="sw-sk-profile__body">
            <SwSkeleton width="9rem" height="0.875rem" :rounded="values.rounded" />
            <SwSkeleton width="6rem" height="0.75rem" :rounded="values.rounded" />
          </div>
        </div>

        <!-- Article composition -->
        <div v-else-if="values.examples === 'article'" class="sw-sk-article">
          <SwSkeleton width="100%" height="10rem" :rounded="values.rounded" />
          <div class="sw-sk-article__body">
            <SwSkeleton width="75%" height="1rem" :rounded="values.rounded" />
            <SwSkeleton width="100%" height="0.875rem" :rounded="values.rounded" />
            <SwSkeleton width="90%" height="0.875rem" :rounded="values.rounded" />
            <SwSkeleton width="50%" height="0.875rem" :rounded="values.rounded" />
          </div>
        </div>

        <!-- List composition -->
        <div v-else-if="values.examples === 'list'" class="sw-sk-list">
          <div v-for="n in 4" :key="n" class="sw-sk-list__row">
            <SwSkeleton
              width="2rem"
              height="2rem"
              :rounded="values.rounded === 'md' ? 'full' : values.rounded"
            />
            <div class="sw-sk-list__text">
              <SwSkeleton
                :width="`${70 + (n % 3) * 10}%`"
                height="0.875rem"
                :rounded="values.rounded"
              />
              <SwSkeleton
                :width="`${40 + (n % 2) * 15}%`"
                height="0.75rem"
                :rounded="values.rounded"
              />
            </div>
            <SwSkeleton
              width="4rem"
              height="1.5rem"
              :rounded="values.rounded"
              class="sw-sk-list__action"
            />
          </div>
        </div>
      </template>
    </SwPlayground>
  </SwPage>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

/* ---- Profile ---- */
.sw-sk-profile {
  @apply flex items-center gap-4 w-64;
}

.sw-sk-profile__body {
  @apply flex flex-col gap-2 flex-1;
}

/* ---- Article ---- */
.sw-sk-article {
  @apply flex flex-col gap-4 w-80;
}

.sw-sk-article__body {
  @apply flex flex-col gap-2;
}

/* ---- List ---- */
.sw-sk-list {
  @apply flex flex-col w-96 border border-border rounded-xl overflow-hidden divide-y divide-border;
}

.sw-sk-list__row {
  @apply flex items-center gap-3 px-4 py-3 bg-surface;
}

.sw-sk-list__text {
  @apply flex flex-col gap-1.5 flex-1;
}

.sw-sk-list__action {
  @apply shrink-0;
}
</style>
