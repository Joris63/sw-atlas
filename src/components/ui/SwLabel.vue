<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    for?: string
    size?: 'xs' | 'sm'
    uppercase?: boolean
    required?: boolean
  }>(),
  {
    size: 'sm',
  },
)
</script>

<template>
  <label
    class="sw-label"
    :class="[`sw-label--${size}`, { 'sw-label--uppercase': uppercase }]"
    :for="props.for"
  >
    <slot />
    <span v-if="required" class="sw-label__required" aria-hidden="true">*</span>
  </label>
</template>

<style scoped>
@reference "../../styles/tailwind.css";

.sw-label {
  @apply inline-flex items-center gap-1 font-medium text-text;
}

.sw-label--sm {
  @apply text-sm;
}
.sw-label--xs {
  @apply text-xs;
}

.sw-label--uppercase {
  @apply uppercase text-text-muted tracking-wider;
}

.sw-label__required {
  @apply text-danger;
}
</style>
