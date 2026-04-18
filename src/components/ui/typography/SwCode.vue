<script setup lang="ts">
defineProps<{
  block?: boolean;
}>();
</script>

<template>
  <code class="sw-code" :class="{ 'sw-code--block': block }">
    <slot />
  </code>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-code {
  @apply text-sm rounded-md px-1.5 py-0.5 font-mono text-primary-700 bg-primary-50;
}

.sw-code--block {
  @apply block px-4 py-3 rounded-lg text-sm;
}
</style>
