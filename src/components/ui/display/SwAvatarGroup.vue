<script setup lang="ts">
import { computed } from 'vue';
import SwAvatar from './SwAvatar.vue';

interface AvatarItem {
  name?: string;
  initials?: string;
  src?: string;
}

interface Props {
  items: AvatarItem[];
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const props = withDefaults(defineProps<Props>(), {
  max: 4,
  size: 'md',
});

const visible = computed(() => props.items.slice(0, props.max));
const overflow = computed(() => Math.max(0, props.items.length - props.max));
</script>

<template>
  <div :class="['sw-avatar-group', `sw-avatar-group--${size}`]">
    <SwAvatar
      v-for="(item, i) in visible"
      :key="i"
      :name="item.name"
      :initials="item.initials"
      :src="item.src"
      :size="size"
      class="sw-avatar-group__avatar"
    />
    <span v-if="overflow > 0" :class="['sw-avatar-group__overflow', `sw-avatar--${size}`]">
      +{{ overflow }}
    </span>
  </div>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-avatar-group {
  @apply flex items-center;
}

.sw-avatar-group__avatar {
  @apply ring-2 ring-surface-strong;
}

.sw-avatar-group__avatar + .sw-avatar-group__avatar,
.sw-avatar-group__avatar + .sw-avatar-group__overflow {
  margin-left: var(--sw-ag-offset);
}

.sw-avatar-group--xs {
  --sw-ag-offset: -0.5rem;
}
.sw-avatar-group--sm {
  --sw-ag-offset: -0.625rem;
}
.sw-avatar-group--md {
  --sw-ag-offset: -0.75rem;
}
.sw-avatar-group--lg {
  --sw-ag-offset: -0.875rem;
}
.sw-avatar-group--xl {
  --sw-ag-offset: -1.25rem;
}

/* Overflow badge — reuses avatar size classes for dimensions */
.sw-avatar-group__overflow {
  @apply inline-flex items-center justify-center
         rounded-full font-semibold ring-2 ring-surface-strong
         bg-surface-hover text-text-muted select-none;
}

.sw-avatar--xs.sw-avatar-group__overflow {
  @apply w-6 h-6;
  font-size: 10px;
}
.sw-avatar--sm.sw-avatar-group__overflow {
  @apply w-8 h-8;
  font-size: 11px;
}
.sw-avatar--md.sw-avatar-group__overflow {
  @apply w-10 h-10 text-sm;
}
.sw-avatar--lg.sw-avatar-group__overflow {
  @apply w-12 h-12 text-base;
}
.sw-avatar--xl.sw-avatar-group__overflow {
  @apply w-16 h-16 text-xl;
}
</style>
