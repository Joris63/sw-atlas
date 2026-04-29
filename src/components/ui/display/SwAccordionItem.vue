<script setup lang="ts">
import { AccordionItem, AccordionItemContent, AccordionItemTrigger } from '@ark-ui/vue';
import SwIcon from './SwIcon.vue';

interface Props {
  value: string;
  title: string;
  icon?: string;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  icon: undefined,
  disabled: false,
});
</script>

<template>
  <AccordionItem :value="value" :disabled="disabled" class="sw-accordion-item">
    <AccordionItemTrigger class="sw-accordion-item__trigger">
      <SwIcon v-if="icon" :name="icon" :size="18" class="sw-accordion-item__icon" />
      <span class="sw-accordion-item__title">{{ title }}</span>
      <SwIcon name="chevron-down" :size="16" class="sw-accordion-item__chevron" />
    </AccordionItemTrigger>

    <AccordionItemContent class="sw-accordion-item__content">
      <div class="sw-accordion-item__body">
        <slot />
      </div>
    </AccordionItemContent>
  </AccordionItem>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-accordion-item {
  @apply bg-surface;
}

/* ---- Trigger ---- */
.sw-accordion-item__trigger {
  @apply flex items-center gap-3 w-full px-5 py-4
         text-left cursor-pointer select-none
         transition-colors duration-150;
}

.sw-accordion-item__trigger:hover {
  @apply bg-surface-subtle;
}

.sw-accordion-item__trigger:disabled {
  @apply opacity-50 cursor-not-allowed;
}

.sw-accordion-item__icon {
  @apply shrink-0 text-text-muted;
}

.sw-accordion-item__title {
  @apply flex-1 text-sm font-semibold text-text;
}

.sw-accordion-item__chevron {
  @apply shrink-0 text-text-muted transition-transform duration-200;
}

.sw-accordion-item__trigger[data-state='open'] .sw-accordion-item__chevron {
  @apply rotate-180;
}

/* ---- Content ---- */
.sw-accordion-item__content {
  overflow: hidden;
}

.sw-accordion-item__content[data-state='open'] {
  animation: sw-accordion-open 0.2s ease-out;
}

.sw-accordion-item__content[data-state='closed'] {
  animation: sw-accordion-close 0.15s ease-in;
}

.sw-accordion-item__body {
  @apply px-5 pb-4 pt-1 text-sm text-text-muted;
  padding-left: calc(1.25rem + 18px + 0.75rem);
}

@keyframes sw-accordion-open {
  from {
    height: 0;
    opacity: 0;
  }
  to {
    height: var(--height);
    opacity: 1;
  }
}

@keyframes sw-accordion-close {
  from {
    height: var(--height);
    opacity: 1;
  }
  to {
    height: 0;
    opacity: 0;
  }
}
</style>
