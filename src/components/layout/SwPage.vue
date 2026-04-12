<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div class="sw-page-content">
    <div class="sw-page-content__header">
      <h1 class="sw-page-content__title">{{ title }}</h1>
      <p v-if="description" class="sw-page-content__desc">{{ description }}</p>
    </div>
    <slot />
  </div>
</template>

<style scoped>
@reference "../../styles/tailwind.css";

.sw-page-content {
  @apply flex flex-col gap-12;
}

.sw-page-content__header {
  @apply flex flex-col gap-2;
}

.sw-page-content__title {
  @apply text-3xl font-semibold text-text;
}

.sw-page-content__desc {
  @apply text-base text-text-muted;
}
</style>
