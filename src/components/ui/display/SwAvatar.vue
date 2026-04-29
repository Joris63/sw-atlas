<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  name?: string;
  initials?: string;
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  presence?: 'online' | 'offline' | 'away' | 'busy';
}

const props = withDefaults(defineProps<Props>(), {
  name: undefined,
  initials: undefined,
  src: undefined,
  size: 'md',
  presence: undefined,
});

const FALLBACK_COLOR = { bg: '#d1fae5', text: '#065f46' };

const COLORS = [
  { bg: '#d1fae5', text: '#065f46' },
  { bg: '#fef3c7', text: '#b45309' },
  { bg: '#cffafe', text: '#0e7490' },
  { bg: '#fce7f3', text: '#9d174d' },
  { bg: '#ede9fe', text: '#5b21b6' },
  { bg: '#dbeafe', text: '#1e40af' },
  { bg: '#fee2e2', text: '#991b1b' },
  { bg: '#fef9c3', text: '#854d0e' },
];

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = str.charCodeAt(i) + ((h << 5) - h);
  }
  return Math.abs(h);
}

const resolvedInitials = computed(() => {
  if (props.initials) {
    return props.initials.slice(0, 2).toUpperCase();
  }
  if (!props.name) {
    return '?';
  }
  const parts = props.name.trim().split(/\s+/).filter(Boolean);
  return parts.length === 1
    ? props.name.slice(0, 2).toUpperCase()
    : ((parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase();
});

const color = computed(() => {
  const key = props.name ?? props.initials ?? '';
  return COLORS[hash(key) % COLORS.length] ?? FALLBACK_COLOR;
});
</script>

<template>
  <span :class="['sw-avatar', `sw-avatar--${size}`]">
    <img v-if="src" :src="src" :alt="name" class="sw-avatar__img" />
    <span v-else class="sw-avatar__initials" :style="{ background: color.bg, color: color.text }">
      {{ resolvedInitials }}
    </span>

    <span v-if="presence" :class="['sw-avatar__presence', `sw-avatar__presence--${presence}`]" />
  </span>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-avatar {
  @apply relative inline-flex items-center justify-center
         rounded-full font-semibold select-none shrink-0 overflow-visible
         ring-2 ring-surface-strong;
}

/* ---- Sizes ---- */
.sw-avatar--xs {
  @apply w-6 h-6;
  font-size: 10px;
}
.sw-avatar--sm {
  @apply w-8 h-8;
  font-size: 11px;
}
.sw-avatar--md {
  @apply w-10 h-10 text-sm;
}
.sw-avatar--lg {
  @apply w-12 h-12 text-base;
}
.sw-avatar--xl {
  @apply w-16 h-16 text-xl;
}

/* ---- Image / Initials ---- */
.sw-avatar__img {
  @apply w-full h-full object-cover rounded-full;
}

.sw-avatar__initials {
  @apply w-full h-full flex items-center justify-center rounded-full;
}

/* ---- Presence dot ---- */
.sw-avatar__presence {
  @apply absolute bottom-0 right-0 rounded-full;
  box-shadow: 0 0 0 2px var(--surface-strong);
}

.sw-avatar--xs .sw-avatar__presence {
  @apply w-1.5 h-1.5;
}
.sw-avatar--sm .sw-avatar__presence {
  @apply w-2 h-2;
}
.sw-avatar--md .sw-avatar__presence {
  @apply w-2.5 h-2.5;
}
.sw-avatar--lg .sw-avatar__presence {
  @apply w-3 h-3;
}
.sw-avatar--xl .sw-avatar__presence {
  @apply w-3.5 h-3.5;
}

.sw-avatar__presence--online {
  background: var(--success);
}
.sw-avatar__presence--offline {
  @apply bg-neutral-400;
}
.sw-avatar__presence--away {
  background: var(--warning);
}
.sw-avatar__presence--busy {
  background: var(--danger);
}
</style>
