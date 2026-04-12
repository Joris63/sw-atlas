<script setup lang="ts">
import { inject, computed } from 'vue'
import type { Ref } from 'vue'
import { ref } from 'vue'

defineProps<{ label: string }>()

const _sidebarOpen = inject<Ref<boolean>>('sidebarOpen', ref(true))
const sidebarOpen = computed(() => _sidebarOpen.value)
</script>

<template>
  <div class="sw-nav-group" :class="{ 'sw-nav-group--collapsed': !sidebarOpen }">
    <span v-if="sidebarOpen" class="sw-nav-group__label">{{ label }}</span>
    <slot />
  </div>
</template>

<style scoped>
@reference "../../styles/tailwind.css";

.sw-nav-group {
  @apply flex flex-col gap-0.5 pt-4 first:pt-2;
}

.sw-nav-group--collapsed {
  @apply pt-2;
}

.sw-nav-group__label {
  @apply px-2 pb-1 text-xs font-semibold uppercase text-text-muted select-none tracking-wider;
}
</style>
