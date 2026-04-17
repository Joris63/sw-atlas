<script setup lang="ts">
import { ref } from 'vue'
import SwCodeBlock from './SwCodeBlock.vue'
import SwButton from './SwButton.vue'

defineProps<{
  title?: string
  code?: string
  previewClass?: string
}>()

const showCode = ref(false)
</script>

<template>
  <div class="sw-example">
    <div v-if="title" class="sw-example__header">
      <span class="sw-example__title">{{ title }}</span>
    </div>

    <div class="sw-example__preview" :class="previewClass">
      <slot />
    </div>

    <div v-if="code" class="sw-example__footer">
      <SwButton
        size="xs"
        variant="ghost"
        icon-left="code-2"
        :icon-right="showCode ? 'chevron-up' : 'chevron-down'"
        :label="showCode ? 'Hide Code' : 'Code'"
        @click="showCode = !showCode"
      />
    </div>

    <div class="sw-example__code-wrap" :class="{ 'sw-example__code-wrap--open': showCode }">
      <div class="sw-example__code-inner">
        <SwCodeBlock v-if="code" :code="code" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-example {
  @apply rounded-xl overflow-hidden border border-border;
}

.sw-example__header {
  @apply px-5 pt-4 pb-1;
}

.sw-example__title {
  @apply text-xs font-semibold uppercase text-text-muted tracking-wider;
}

.sw-example__preview {
  @apply p-5 flex flex-wrap items-start gap-3;
}

.sw-example__footer {
  @apply flex justify-end px-3 py-2 border-t border-border;
}

/* Animated code reveal */
.sw-example__code-wrap {
  @apply grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-in-out;
}

.sw-example__code-wrap--open {
  @apply grid-rows-[1fr];
}

.sw-example__code-inner {
  @apply overflow-hidden;
}
</style>
