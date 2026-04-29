<script setup lang="ts">
interface Props {
  width?: string;
  height?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | (string & {});
}

withDefaults(defineProps<Props>(), {
  width: undefined,
  height: undefined,
  rounded: 'md',
});

const PRESET_RADII: Record<string, string> = {
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  full: '9999px',
};
</script>

<template>
  <span
    class="sw-skeleton"
    :style="{
      width,
      height,
      borderRadius: PRESET_RADII[rounded!] ?? rounded,
    }"
    aria-hidden="true"
  />
</template>

<style scoped>
.sw-skeleton {
  display: block;
  background: linear-gradient(
    90deg,
    var(--surface-hover) 0%,
    color-mix(in srgb, var(--surface-strong) 40%, transparent) 50%,
    var(--surface-hover) 100%
  );
  background-size: 200% 100%;
  animation: sw-skeleton-shimmer 1.6s ease-in-out infinite;
}

@keyframes sw-skeleton-shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}
</style>
