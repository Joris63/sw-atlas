<script setup lang="ts">
import { TabContent, TabIndicator, TabList, TabsRoot, TabTrigger } from '@ark-ui/vue';

export interface SwTab {
  value: string;
  label: string;
  badge?: number | string;
}

interface Props {
  modelValue: string;
  tabs: SwTab[];
}

defineProps<Props>();
const emit = defineEmits<{ 'update:modelValue': [string] }>();
</script>

<template>
  <TabsRoot
    class="sw-tabs"
    :model-value="modelValue"
    @value-change="emit('update:modelValue', $event.value)"
  >
    <TabList class="sw-tabs__list">
      <TabIndicator class="sw-tabs__indicator" />
      <TabTrigger v-for="tab in tabs" :key="tab.value" :value="tab.value" class="sw-tabs__trigger">
        {{ tab.label }}
        <span v-if="tab.badge !== undefined && tab.badge !== ''" class="sw-tabs__badge">
          {{ tab.badge }}
        </span>
      </TabTrigger>
    </TabList>

    <TabContent v-for="tab in tabs" :key="tab.value" :value="tab.value" class="sw-tabs__content">
      <slot :name="tab.value" />
    </TabContent>
  </TabsRoot>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-tabs {
  @apply flex flex-col w-full;
}

/* ---- Tab list ---- */
.sw-tabs__list {
  @apply relative flex items-end gap-1
         border-b border-border;
}

/* ---- Sliding indicator ---- */
.sw-tabs__indicator {
  @apply absolute bottom-0 h-0.5 bg-primary rounded-t-sm;
  transition:
    left 200ms cubic-bezier(0.4, 0, 0.2, 1),
    width 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* ---- Tab triggers ---- */
.sw-tabs__trigger {
  @apply relative flex items-center gap-2
         px-3 py-2.5 text-sm text-text-muted
         cursor-pointer select-none whitespace-nowrap
         transition-colors duration-150
         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus
         rounded-t-md;
}

.sw-tabs__trigger:hover:not([data-disabled]) {
  @apply text-text;
}

.sw-tabs__trigger[data-selected] {
  @apply text-text font-medium;
}

.sw-tabs__trigger[data-disabled] {
  @apply opacity-50 cursor-not-allowed;
}

/* ---- Badge ---- */
.sw-tabs__badge {
  @apply inline-flex items-center justify-center
         min-w-5 h-5 px-1.5 rounded-full
         text-[10px] font-semibold leading-none
         bg-surface-hover text-text-muted
         transition-colors duration-150;
}

.sw-tabs__trigger[data-selected] .sw-tabs__badge {
  @apply text-primary;
  background: color-mix(in srgb, var(--color-primary) 12%, transparent);
}

/* ---- Content ---- */
.sw-tabs__content {
  @apply pt-4 outline-none;
}
</style>
