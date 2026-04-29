<script setup lang="ts">
import SwIcon from '@/components/ui/display/SwIcon.vue';

interface Item {
  label: string;
  icon?: string;
  to?: string;
}

defineProps<{ items: Item[] }>();
</script>

<template>
  <nav class="sw-breadcrumbs" aria-label="Breadcrumb">
    <ol class="sw-breadcrumbs__list">
      <li v-for="(item, index) in items" :key="index" class="sw-breadcrumbs__item">
        <span v-if="index > 0" class="sw-breadcrumbs__separator" aria-hidden="true">/</span>
        <a v-if="item.to" :href="item.to" class="sw-breadcrumbs__link" :aria-label="item.label">
          <SwIcon v-if="item.icon" :name="item.icon" :size="15" />
          <span v-else>{{ item.label }}</span>
        </a>
        <span v-else class="sw-breadcrumbs__current" :aria-label="item.label">
          <SwIcon v-if="item.icon" :name="item.icon" :size="15" />
          <span v-else>{{ item.label }}</span>
        </span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-breadcrumbs__list {
  @apply flex items-center gap-1.5 text-sm;
}

.sw-breadcrumbs__item {
  @apply flex items-center gap-1.5;
}

.sw-breadcrumbs__separator {
  @apply text-text-subtle;
}

.sw-breadcrumbs__link {
  @apply text-text-muted hover:text-text transition-colors duration-150;
}

.sw-breadcrumbs__current {
  @apply text-text font-medium;
}
</style>
