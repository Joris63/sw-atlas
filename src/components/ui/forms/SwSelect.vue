<script setup lang="ts">
import { computed } from 'vue';
import {
  SelectContent,
  SelectHiddenSelect,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPositioner,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  createListCollection,
} from '@ark-ui/vue';
import SwIcon from '../SwIcon.vue';

export interface SwSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface Props {
  modelValue: string;
  options: SwSelectOption[];
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  deselectable?: boolean;
  disabled?: boolean;
  loadingOptions?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select…',
  size: 'md',
  deselectable: true,
  disabled: false,
  loadingOptions: false,
});

const emit = defineEmits<{ 'update:modelValue': [string] }>();

const collection = computed(() =>
  createListCollection({
    items: props.options.map((o) => ({ label: o.label, value: o.value, disabled: o.disabled })),
  }),
);
</script>

<template>
  <SelectRoot
    class="sw-select"
    :collection="collection"
    :model-value="modelValue ? [modelValue] : []"
    :disabled="disabled"
    :read-only="loadingOptions"
    :deselectable="deselectable"
    @value-change="emit('update:modelValue', $event.value[0] ?? '')"
  >
    <SelectTrigger class="sw-select__trigger" :class="`sw-select__trigger--${size}`">
      <div v-if="loadingOptions" class="sw-select__loading">
        Loading options...
        <SwIcon name="loader-2" :size="16" class="sw-select__spinner" aria-hidden="true" />
      </div>
      <template v-else>
        <SelectValueText :placeholder="placeholder" class="sw-select__value" />
        <SwIcon name="chevron-down" :size="14" class="sw-select__chevron" />
      </template>
    </SelectTrigger>
    <SelectHiddenSelect />
    <Teleport to="body">
      <SelectPositioner class="sw-select__positioner">
        <SelectContent class="sw-select__content">
          <SelectItem
            v-for="item in collection.items"
            :key="item.value"
            :item="item"
            class="sw-select__item"
          >
            <SelectItemText class="sw-select__item-text">{{ item.label }}</SelectItemText>
            <SelectItemIndicator class="sw-select__item-indicator">
              <SwIcon name="check" :size="13" />
            </SelectItemIndicator>
          </SelectItem>
        </SelectContent>
      </SelectPositioner>
    </Teleport>
  </SelectRoot>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-select {
  @apply relative inline-flex flex-col w-full;
}

.sw-select__loading {
  @apply flex justify-between items-center w-full;
}

.sw-select__spinner {
  @apply animate-spin shrink-0;
}

.sw-select__trigger {
  @apply flex w-full items-center justify-between gap-2
         px-3 rounded-lg bg-surface-subtle border border-border
         text-text cursor-pointer select-none
         transition-colors duration-150
         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus;
}

.sw-select__trigger[data-placeholder-shown] {
  @apply text-text-subtle;
}

.sw-select__trigger:hover:not([data-disabled]) {
  @apply border-border-strong;
}

.sw-select__trigger[data-state='open'] {
  @apply border-border-focus;
}

.sw-select__trigger[data-disabled] {
  @apply opacity-50 cursor-not-allowed;
}

.sw-select__trigger--sm {
  @apply h-8 text-xs;
}
.sw-select__trigger--md {
  @apply h-10 text-sm;
}
.sw-select__trigger--lg {
  @apply h-12 text-base;
}

.sw-select__value {
  @apply flex-1 truncate text-left;
}

.sw-select__chevron {
  @apply shrink-0 text-text-muted transition-transform duration-150;
}

.sw-select__trigger[data-state='open'] .sw-select__chevron {
  @apply rotate-180;
}

.sw-select__positioner {
  z-index: 9000;
  width: var(--reference-width);
}

.sw-select__content {
  @apply bg-surface border border-border rounded-lg p-1 outline-none min-w-32;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.sw-select__content[data-state='open'] {
  animation: sw-select-in 120ms ease both;
}

.sw-select__content[data-state='closed'] {
  @apply hidden;
}

@keyframes sw-select-in {
  from {
    opacity: 0;
    transform: translateY(-4px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.sw-select__item {
  @apply flex items-center gap-2 py-1.5 px-2.5 rounded-md text-sm text-text cursor-pointer outline-none;
  user-select: none;
  transition: background 100ms;
}

.sw-select__item[data-highlighted] {
  @apply bg-surface-hover;
}

.sw-select__item[data-state='checked'] {
  @apply text-primary font-medium;
}

.sw-select__item[data-disabled] {
  @apply opacity-50;
  cursor: not-allowed;
}

.sw-select__item-indicator {
  @apply flex items-center text-primary shrink-0;
}
</style>
