<script setup lang="ts">
import { computed, ref, provide, watch, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import SwTopBar from '@/components/navigation/SwTopBar.vue';
import SwBreadcrumbs from '@/components/navigation/SwBreadcrumbs.vue';
import SwNavSidebar from '@/components/navigation/SwNavSidebar.vue';
import SwIconButton from '@/components/ui/buttons/SwIconButton.vue';
import logoNl from '@/assets/logo-nl.svg?raw';
import logoBe from '@/assets/logo-be.svg?raw';

interface BreadcrumbItem {
  label: string;
  icon?: string;
  to?: string;
}

const props = defineProps<{
  logo: 'nl' | 'be';
}>();

const logoSvg = computed(() => (props.logo === 'be' ? logoBe : logoNl));

const route = useRoute();
const breadcrumbs = computed(
  () =>
    (route.meta.breadcrumbs as BreadcrumbItem[] | undefined) ?? [
      { label: 'Home', icon: 'house', to: '/' },
    ],
);

// Tier state
const isMobile = ref(false);
const isDesktop = ref(false);

// Sidebar state (lifted from SwNavSidebar)
const sidebarOpen = ref(false);
const openNavItemId = ref<symbol | null>(null);

provide('sidebarOpen', sidebarOpen);
provide('openNavItemId', openNavItemId);
provide('isMobile', isMobile);
provide('isDesktop', isDesktop);

function toggle() {
  sidebarOpen.value = !sidebarOpen.value;

  if (!sidebarOpen.value) {
    openNavItemId.value = null;
  }
}
provide('toggleSidebar', toggle);

// Close sidebar on navigation (mobile only)
watch(
  () => route.path,
  () => {
    if (isMobile.value) {
      sidebarOpen.value = false;
    }
  },
);

// matchMedia — detect tier and set initial open state
let mqMobile: MediaQueryList;
let mqDesktop: MediaQueryList;

function applyTier() {
  isMobile.value = mqMobile.matches;
  isDesktop.value = mqDesktop.matches;
  sidebarOpen.value = mqDesktop.matches;
}

onMounted(() => {
  mqMobile = window.matchMedia('(max-width: 767px)');
  mqDesktop = window.matchMedia('(min-width: 1024px)');

  applyTier();

  mqMobile.addEventListener('change', applyTier);
  mqDesktop.addEventListener('change', applyTier);
});

onUnmounted(() => {
  mqMobile?.removeEventListener('change', applyTier);
  mqDesktop?.removeEventListener('change', applyTier);
});
</script>

<template>
  <div class="sw-layout">
    <SwTopBar>
      <template #menu-btn>
        <span v-if="isMobile" class="sw-hamburger">
          <SwIconButton
            :icon="sidebarOpen ? 'panel-left-close' : 'panel-left-open'"
            :label="sidebarOpen ? 'Close navigation' : 'Open navigation'"
            variant="plain"
            @click="toggle"
          />
        </span>
      </template>

      <template #logo>
        <span class="sw-layout__logo" v-html="logoSvg" />
      </template>

      <template v-if="$slots['topbar-end']" #end>
        <slot name="topbar-end" />
      </template>
    </SwTopBar>

    <!-- Backdrop: shown on mobile + tablet when sidebar is open -->
    <Transition name="sw-fade">
      <div v-if="!isDesktop && sidebarOpen" class="sw-layout__backdrop" @click="toggle" />
    </Transition>

    <div class="sw-layout__body">
      <SwNavSidebar>
        <slot name="nav" />
      </SwNavSidebar>

      <main class="sw-page">
        <SwBreadcrumbs
          v-if="breadcrumbs.length > 1"
          :items="breadcrumbs"
          class="sw-page__breadcrumbs"
        />
        <div class="sw-page__card">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-layout {
  @apply flex flex-col h-screen overflow-hidden;
}

.sw-layout__body {
  @apply flex flex-1 overflow-hidden;
}

.sw-layout__backdrop {
  @apply fixed inset-x-0 bottom-0 top-16 z-40;
  background: rgba(0, 0, 0, 0.45); /* no theme token for raw overlay opacity */
}

.sw-layout__logo {
  @apply flex items-center text-text-on-primary;
}

.sw-layout__logo :deep(svg) {
  @apply h-9 w-auto;
}

.sw-page {
  @apply flex-1 overflow-y-auto p-3 md:p-4 lg:p-6 flex flex-col gap-4 bg-bg;
}

.sw-page__breadcrumbs {
  @apply px-2;
}

.sw-page__card {
  @apply bg-surface rounded-xl md:rounded-2xl border border-border p-4 md:p-6 lg:p-8 flex-1 w-full min-w-0 shadow-md;
}

.sw-hamburger :deep(.sw-icon-button) {
  @apply text-text-on-primary;
}

.sw-hamburger :deep(.sw-icon-button:not(:disabled):hover) {
  background: rgba(0, 0, 0, 0.1); /* no theme token for raw overlay opacity */
}

.dark .sw-hamburger :deep(.sw-icon-button:not(:disabled):hover) {
  background: rgba(255, 255, 255, 0.15); /* no theme token for raw overlay opacity */
}

.sw-fade-enter-active,
.sw-fade-leave-active {
  @apply transition-opacity duration-200;
}

.sw-fade-enter-from,
.sw-fade-leave-to {
  @apply opacity-0;
}
</style>
