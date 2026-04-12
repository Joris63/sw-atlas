<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SwTopBar from '@/components/navigation/SwTopBar.vue'
import SwBreadcrumbs from '@/components/navigation/SwBreadcrumbs.vue'
import SwNavSidebar from '@/components/navigation/SwNavSidebar.vue'

interface BreadcrumbItem {
  label: string
  icon?: string
  to?: string
}

const route = useRoute()
const breadcrumbs = computed(
  () =>
    (route.meta.breadcrumbs as BreadcrumbItem[] | undefined) ?? [
      { label: 'Home', icon: 'house', to: '/' },
    ],
)
</script>

<template>
  <div class="sw-layout">
    <SwTopBar>
      <template v-if="$slots.logo" #logo>
        <slot name="logo" />
      </template>
      <template v-if="$slots['topbar-end']" #end>
        <slot name="topbar-end" />
      </template>
    </SwTopBar>

    <div class="sw-layout__body">
      <SwNavSidebar>
        <slot name="nav" />
      </SwNavSidebar>

      <main class="sw-page">
        <SwBreadcrumbs
          v-if="breadcrumbs.length > 1"
          :items="breadcrumbs"
          class="sw-page__breadcrumbs"
        />
        <div class="sw-page__card">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
@reference "../../styles/tailwind.css";

.sw-layout {
  @apply flex flex-col h-screen overflow-hidden;
}

.sw-layout__body {
  @apply flex flex-1 overflow-hidden;
}

.sw-page {
  @apply flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-bg;
}

.sw-page__breadcrumbs {
  @apply px-2;
}

.sw-page__card {
  @apply bg-surface rounded-2xl border border-border p-8 flex-1 w-full min-w-0 shadow-md;
}
</style>
