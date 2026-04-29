<script setup lang="ts">
import { TabContent, TabIndicator, TabList, TabsRoot, TabTrigger } from '@ark-ui/vue';
import SwIcon from '@/components/ui/display/SwIcon.vue';

export interface SwTab {
  value: string;
  label: string;
  icon?: string;
  badge?: number | string;
  disabled?: boolean;
}

interface Props {
  modelValue: string;
  tabs: SwTab[];
  orientation?: 'horizontal' | 'vertical';
  lazy?: boolean;
  labelWidth?: string;
}

withDefaults(defineProps<Props>(), {
  orientation: 'horizontal',
  lazy: true,
  labelWidth: '10rem',
});
const emit = defineEmits<{ 'update:modelValue': [string] }>();
</script>

<template>
  <TabsRoot
    :class="['sw-tabs', `sw-tabs--${orientation}`]"
    :style="orientation === 'vertical' ? { '--sw-tabs-label-width': labelWidth } : undefined"
    :model-value="modelValue"
    :orientation="orientation"
    @value-change="emit('update:modelValue', $event.value)"
  >
    <TabList class="sw-tabs__list">
      <TabIndicator class="sw-tabs__indicator" />
      <TabTrigger
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
        :disabled="tab.disabled"
        class="sw-tabs__trigger"
      >
        <SwIcon v-if="tab.icon" :name="tab.icon" :size="15" class="sw-tabs__icon" />
        {{ tab.label }}
        <span v-if="tab.badge !== undefined && tab.badge !== ''" class="sw-tabs__badge">
          {{ tab.badge }}
        </span>
      </TabTrigger>
    </TabList>

    <TabContent
      v-for="tab in tabs"
      :key="tab.value"
      :value="tab.value"
      :lazy-mount="lazy"
      class="sw-tabs__content"
    >
      <slot :name="tab.value" />
    </TabContent>
  </TabsRoot>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

/* ---- Root ---- */
.sw-tabs {
  @apply flex w-full;
}

.sw-tabs--horizontal {
  @apply flex-col;
}

.sw-tabs--vertical {
  @apply flex-row;
}

/* ---- Tab list ---- */
.sw-tabs__list {
  @apply relative flex;
}

.sw-tabs--horizontal .sw-tabs__list {
  @apply items-end gap-1 border-b border-border;
}

.sw-tabs--vertical .sw-tabs__list {
  @apply flex-col gap-0.5 border-r border-border shrink-0 pr-1 py-1;
  min-width: var(--sw-tabs-label-width, 10rem);
}

/* ---- Sliding indicator ---- */
.sw-tabs__indicator {
  @apply absolute bg-primary rounded-sm;
}

.sw-tabs--horizontal .sw-tabs__indicator {
  @apply h-0.5 rounded-t-sm z-10 -bottom-px;
  left: var(--left);
  width: var(--width);
  transition:
    left 200ms cubic-bezier(0.4, 0, 0.2, 1),
    width 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.sw-tabs--vertical .sw-tabs__indicator {
  @apply right-0 w-0.5 rounded-l-sm;
  top: var(--top);
  height: var(--height);
  transition:
    top 200ms cubic-bezier(0.4, 0, 0.2, 1),
    height 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* ---- Tab triggers ---- */
.sw-tabs__trigger {
  @apply relative flex items-center gap-2
         text-sm text-text-muted
         cursor-pointer select-none whitespace-nowrap
         transition-colors duration-150
         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus;
}

.sw-tabs--horizontal .sw-tabs__trigger {
  @apply px-3 py-2.5 rounded-t-md;
}

.sw-tabs--vertical .sw-tabs__trigger {
  @apply w-full px-3 py-2 rounded-md text-left;
}

.sw-tabs__trigger:hover:not([data-disabled]) {
  @apply text-text;
}

.sw-tabs--vertical .sw-tabs__trigger:hover:not([data-disabled]) {
  @apply bg-surface-subtle;
}

.sw-tabs__trigger[data-selected] {
  @apply text-text font-medium;
}

.sw-tabs--vertical .sw-tabs__trigger[data-selected] {
  @apply text-primary;
  background: color-mix(in srgb, var(--color-primary) 8%, transparent);
}

.sw-tabs__trigger[data-disabled] {
  @apply opacity-50 cursor-not-allowed;
}

/* ---- Icon ---- */
.sw-tabs__icon {
  @apply shrink-0;
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
.sw-tabs--horizontal .sw-tabs__content {
  @apply pt-4 outline-none;
}

.sw-tabs--vertical .sw-tabs__content {
  @apply pl-6 pt-1 outline-none flex-1;
}
</style>
