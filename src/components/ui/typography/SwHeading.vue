<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: '5xl' | '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'base' | 'sm';
}

const props = withDefaults(defineProps<Props>(), {
  level: 2,
  size: undefined,
});

const tag = computed(() => `h${props.level}`);

const defaultSize: Record<number, string> = {
  1: '4xl',
  2: '3xl',
  3: '2xl',
  4: 'xl',
  5: 'lg',
  6: 'base',
};

const sizeClass = computed(() => `sw-heading--${props.size ?? defaultSize[props.level ?? 2]}`);
</script>

<template>
  <component :is="tag" class="sw-heading" :class="sizeClass">
    <slot />
  </component>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-heading {
  @apply font-semibold text-text leading-tight;
}

.sw-heading--5xl {
  @apply text-5xl;
}
.sw-heading--4xl {
  @apply text-4xl;
}
.sw-heading--3xl {
  @apply text-3xl;
}
.sw-heading--2xl {
  @apply text-2xl;
}
.sw-heading--xl {
  @apply text-xl;
}
.sw-heading--lg {
  @apply text-lg;
}
.sw-heading--base {
  @apply text-base;
}
.sw-heading--sm {
  @apply text-sm;
}
</style>
