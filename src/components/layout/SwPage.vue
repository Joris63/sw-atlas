<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
}>();
</script>

<template>
  <div class="sw-page-content">
    <p v-if="description" class="sw-page-content__desc">{{ description }}</p>
    <slot />
  </div>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-page-content {
  @apply flex flex-col gap-6 md:gap-8 lg:gap-12;
}

.sw-page-content__header {
  @apply flex flex-col gap-2;
}

.sw-page-content__title {
  @apply text-xl md:text-2xl lg:text-3xl font-semibold text-text;
}

.sw-page-content__desc {
  @apply text-sm md:text-base text-text-muted;
}
</style>
