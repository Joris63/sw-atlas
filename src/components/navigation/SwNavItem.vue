<script setup lang="ts">
import { ref, inject, provide, useSlots, computed, watch } from 'vue';
import type { Ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import SwIcon from '@/components/ui/display/SwIcon.vue';
import SwTooltip from '../ui/overlays/SwTooltip.vue';

interface Props {
  icon?: string;
  label: string;
  active?: boolean;
  to?: string;
}

const props = defineProps<Props>();

const router = useRouter();
const route = useRoute();

const slots = useSlots();
const hasChildren = computed(() => !!slots.default);

const groupLabel = inject<string>('groupLabel', '');
const sidebarOpen = inject<Ref<boolean>>('sidebarOpen', ref<boolean>(true));
const depth = inject<number>('navDepth', 0);
const openItemId = inject<Ref<symbol | null>>('openNavItemId', ref<symbol | null>(null));

// Each root-level item gets a stable identity for accordion coordination
const id = Symbol();
const localExpanded = ref(false);

provide('navDepth', depth + 1);

const isExpanded = computed({
  get: () => (depth === 0 ? openItemId.value === id : localExpanded.value),
  set: (val: boolean) => {
    if (depth === 0) {
      openItemId.value = val ? id : null;
    } else {
      localExpanded.value = val;
    }
  },
});

const isActive = computed(() => props.active || (!!props.to && route.path === props.to));

// Bubble active state up so a collapsed parent highlights when a child route is active.
// Track a Set of active child IDs so multiple siblings reporting don't overwrite each other.
const activeChildIds = new Set<symbol>();
const hasActiveDescendant = ref(false);
const reportToParent = inject<((childId: symbol, active: boolean) => void) | null>(
  'reportActiveChild',
  null,
);

provide('reportActiveChild', (childId: symbol, active: boolean) => {
  if (active) {
    activeChildIds.add(childId);
  } else {
    activeChildIds.delete(childId);
  }

  hasActiveDescendant.value = activeChildIds.size > 0;
});

watch(
  [isActive, hasActiveDescendant],
  () => reportToParent?.(id, isActive.value || hasActiveDescendant.value),
  { immediate: true },
);

const showAsActive = computed(() => isActive.value || hasActiveDescendant.value);
const tooltipContent = computed(() => {
  if (groupLabel === '') {
    return props.label;
  }

  return `${groupLabel} · ${props.label}`;
});

function handleClick() {
  if (!sidebarOpen.value) {
    if (props.to) {
      void router.push(props.to);
    } else {
      sidebarOpen.value = true;
      if (hasChildren.value) {
        isExpanded.value = true;
      }
    }

    return;
  }

  if (props.to) {
    void router.push(props.to);
  } else if (hasChildren.value) {
    isExpanded.value = !isExpanded.value;
  }
}
</script>

<template>
  <div class="sw-nav-item">
    <SwTooltip
      :content="tooltipContent"
      placement="right"
      :open-delay="200"
      :disabled="sidebarOpen"
    >
      <button
        type="button"
        class="sw-nav-item__button"
        :class="[
          depth > 0 ? 'sw-nav-item__button--child' : 'sw-nav-item__button--root',
          {
            'sw-nav-item__button--active': showAsActive,
            'sw-nav-item__button--collapsed': !sidebarOpen,
          },
        ]"
        @click="handleClick"
      >
        <SwIcon v-if="icon && depth === 0" :name="icon" :size="16" class="sw-nav-item__icon" />

        <span class="sw-nav-item__label">{{ label }}</span>

        <SwIcon
          v-if="hasChildren && sidebarOpen"
          :name="isExpanded ? 'chevron-up' : 'chevron-down'"
          :size="14"
          class="sw-nav-item__chevron"
        />
      </button>
    </SwTooltip>

    <div
      v-if="hasChildren"
      v-show="sidebarOpen"
      class="sw-nav-item__children-wrap"
      :class="{ 'sw-nav-item__children-wrap--open': isExpanded }"
      @click.stop
    >
      <div class="sw-nav-item__children">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-nav-item {
  @apply flex flex-col;
}

/* Root level items */
.sw-nav-item__button--root {
  @apply flex items-center gap-2.5 w-full px-2 h-8 rounded-md
         text-sm text-text-muted
         cursor-pointer select-none
         transition-all duration-150
         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus;
}

.sw-nav-item__button--root:hover {
  @apply text-text bg-surface-subtle;
}

.sw-nav-item__button--root.sw-nav-item__button--active {
  @apply text-primary font-semibold;
  background-color: color-mix(in srgb, var(--color-primary) 10%, var(--surface));
}

/* Child items */
.sw-nav-item__button--child {
  @apply flex items-center gap-2.5 w-full px-2 h-7 rounded-md
         text-sm text-text-muted
         cursor-pointer select-none
         transition-colors duration-150
         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus;
}

.sw-nav-item__button--child:hover {
  @apply text-text bg-surface-subtle;
}

.sw-nav-item__button--child.sw-nav-item__button--active {
  @apply text-primary font-semibold;
  background-color: color-mix(in srgb, var(--color-primary) 10%, var(--surface));
}

.sw-nav-item__button--collapsed {
  @apply px-5;
}

.sw-nav-item__icon {
  @apply shrink-0;
}

.sw-nav-item__label {
  @apply text-left flex-1 overflow-hidden whitespace-nowrap text-ellipsis max-w-48 opacity-100
         transition-all duration-200;
}

.sw-nav-item__button--collapsed .sw-nav-item__label {
  @apply max-w-0 opacity-0 flex-none;
}

.sw-nav-item__chevron {
  @apply shrink-0 ml-auto opacity-40;
}

.sw-nav-item__children-wrap {
  @apply grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-in-out;
}

.sw-nav-item__children-wrap--open {
  @apply grid-rows-[1fr];
}

.sw-nav-item__children {
  @apply flex flex-col gap-0.5 ml-6 mt-0.5 mb-1 overflow-hidden;
}
</style>
