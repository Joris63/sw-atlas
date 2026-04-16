<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SwHeading from '@/components/ui/SwHeading.vue'
import SwText from '@/components/ui/SwText.vue'

const route = useRoute()
const title = computed(() => {
  const crumbs = route.meta.breadcrumbs as Array<{ label: string }> | undefined
  return crumbs?.at(-1)?.label ?? 'Pagina'
})
</script>

<template>
  <div class="sg-placeholder">
    <div class="sg-placeholder__icon">
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    </div>
    <SwHeading :level="1" size="2xl">{{ title }}</SwHeading>
    <SwText size="sm" color="muted">This page is under construction.</SwText>
  </div>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sg-placeholder {
  @apply flex flex-col items-center justify-center gap-4 text-center min-h-96;
}

.sg-placeholder__icon {
  @apply text-text-subtle;
}
</style>
