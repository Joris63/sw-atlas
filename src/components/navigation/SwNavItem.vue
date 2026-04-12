<script setup lang="ts">
import { ref, inject, provide, useSlots, computed } from 'vue'
import type { Ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import SwIcon from '@/components/ui/SwIcon.vue'

interface Props {
  icon?: string
  label: string
  active?: boolean
  to?: string
}

const props = defineProps<Props>()

const router = useRouter()
const route = useRoute()

const slots = useSlots()
const hasChildren = computed(() => !!slots.default)
const _sidebarOpen = inject<Ref<boolean>>('sidebarOpen', ref(true))
const sidebarOpen = computed(() => _sidebarOpen.value)
const depth = inject<number>('navDepth', 0)
const openItemId = inject<Ref<symbol | null>>('openNavItemId', ref(null))

const isActive = computed(() => props.active || (!!props.to && route.path === props.to))

// Each root-level item gets a stable identity for accordion coordination
const id = Symbol()

provide('navDepth', depth + 1)

const isExpanded = computed({
  get: () => (depth === 0 ? openItemId.value === id : _localExpanded.value),
  set: (val: boolean) => {
    if (depth === 0) openItemId.value = val ? id : null
    else _localExpanded.value = val
  },
})
const _localExpanded = ref(false)

function handleClick() {
  if (!sidebarOpen.value) {
    _sidebarOpen.value = true
    if (hasChildren.value) isExpanded.value = true
    if (props.to) router.push(props.to)
    return
  }
  if (props.to) {
    router.push(props.to)
    return
  }
  if (hasChildren.value) {
    isExpanded.value = !isExpanded.value
  }
}
</script>

<template>
  <div class="sw-nav-item">
    <button
      type="button"
      class="sw-nav-item__btn"
      :class="[
        depth > 0 ? 'sw-nav-item__btn--child' : 'sw-nav-item__btn--root',
        { 'sw-nav-item__btn--active': isActive, 'sw-nav-item__btn--collapsed': !sidebarOpen },
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

    <div
      v-if="hasChildren && sidebarOpen"
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
@reference "../../styles/tailwind.css";

.sw-nav-item {
  @apply flex flex-col;
}

/* Root level items */
.sw-nav-item__btn--root {
  @apply flex items-center gap-2.5 w-full px-2 h-8 rounded-md
         text-sm text-text-muted
         cursor-pointer select-none
         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus;
  transition:
    color 150ms ease,
    background-color 150ms ease,
    padding 200ms ease;
}

.sw-nav-item__btn--root:hover {
  @apply text-text;
}

.sw-nav-item__btn--root.sw-nav-item__btn--active {
  @apply text-text font-semibold;
}

/* Child items */
.sw-nav-item__btn--child {
  @apply flex items-center gap-2.5 w-full px-2 h-7 rounded-md
         text-sm text-primary
         cursor-pointer select-none
         transition-colors duration-150
         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus;
}

.sw-nav-item__btn--child:hover {
  @apply text-primary underline;
}

.sw-nav-item__btn--child.sw-nav-item__btn--active {
  @apply font-semibold;
}

.sw-nav-item__btn--collapsed {
  @apply px-5;
}

.sw-nav-item__icon {
  @apply shrink-0;
}

.sw-nav-item__label {
  @apply text-left flex-1 overflow-hidden whitespace-nowrap text-ellipsis max-w-48 opacity-100;
  transition:
    max-width 200ms ease,
    opacity 150ms ease;
}

.sw-nav-item__btn--collapsed .sw-nav-item__label {
  @apply max-w-0 opacity-0 flex-none;
}

.sw-nav-item__chevron {
  @apply shrink-0 ml-auto opacity-40;
}

.sw-nav-item__children-wrap {
  @apply grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 200ms ease;
}

.sw-nav-item__children-wrap--open {
  grid-template-rows: 1fr;
}

.sw-nav-item__children {
  @apply flex flex-col ml-6 mt-0.5 mb-1 overflow-hidden;
}
</style>
