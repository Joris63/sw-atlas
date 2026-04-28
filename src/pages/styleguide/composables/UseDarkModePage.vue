<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue';
import SwPropsTable from '@/components/ui/docs/SwPropsTable.vue';
import SwHeading from '@/components/ui/typography/SwHeading.vue';
import SwText from '@/components/ui/typography/SwText.vue';
import SwCodeBlock from '@/components/ui/docs/SwCodeBlock.vue';
import SwDarkModeToggle from '@/components/ui/SwDarkModeToggle.vue';
import { useDarkMode } from '@/composables/useDarkMode';

const { isDark } = useDarkMode();

const returnsRows = [
  {
    name: 'isDark',
    type: 'Ref<boolean>',
    description:
      'Reactive dark mode state. Shared singleton — all calls to useDarkMode() across the app read and write the same ref.',
  },
  {
    name: 'toggle',
    type: '() => void',
    description:
      'Flips isDark and persists the choice to localStorage under the key "sw-theme".',
  },
];

const usageCode = `import { useDarkMode } from '@/composables/useDarkMode';

const { isDark, toggle } = useDarkMode();

// isDark is a shared singleton — reactive across all component instances
// toggle() persists to localStorage and syncs system dark class on <html>`;

const componentCode = `<!-- Drop anywhere — no props needed -->
<SwDarkModeToggle />`;
</script>

<template>
  <SwPage
    title="useDarkMode"
    description="A singleton composable for dark mode. Reads the system preference on first load, persists the user's choice to localStorage, and applies the dark class to the document root."
  >
    <!-- How it works -->
    <section class="sw-use-dark-mode-page__section">
      <SwHeading :level="2" size="xl">How it works</SwHeading>
      <SwText color="muted">
        The isDark ref is created once at module load time, making it a true singleton. Every
        component that calls useDarkMode() shares the same ref — toggling in one place updates
        everywhere. On first load, it checks localStorage for a saved preference and falls back to
        the browser's prefers-color-scheme media query.
      </SwText>
    </section>

    <!-- API Reference -->
    <section class="sw-use-dark-mode-page__section">
      <SwHeading :level="2" size="xl">API</SwHeading>
      <SwPropsTable label="Returns" icon="arrow-right-from-line" :rows="returnsRows" />
      <SwCodeBlock :code="usageCode" language="ts" :show-toolbar="false" />
    </section>

    <!-- Live Demo -->
    <section class="sw-use-dark-mode-page__section">
      <SwHeading :level="2" size="xl">Demo</SwHeading>
      <SwText color="muted">
        This demo and the toggle button in the top bar share the same isDark ref. Clicking either
        one updates both.
      </SwText>

      <div class="sw-use-dark-mode-page__demo-card">
        <div class="sw-use-dark-mode-page__demo-card-topbar">
          <span class="sw-use-dark-mode-page__demo-card-topbar-label">Mock top bar</span>
          <SwDarkModeToggle />
        </div>
        <div class="sw-use-dark-mode-page__demo-card-state">
          <div class="sw-use-dark-mode-page__state-row">
            <code class="sw-use-dark-mode-page__state-key">isDark</code>
            <span
              :class="[
                'sw-use-dark-mode-page__state-badge',
                isDark
                  ? 'sw-use-dark-mode-page__state-badge--active'
                  : 'sw-use-dark-mode-page__state-badge--inactive',
              ]"
            >
              {{ String(isDark) }}
            </span>
          </div>
          <div class="sw-use-dark-mode-page__state-row">
            <code class="sw-use-dark-mode-page__state-key">localStorage["sw-theme"]</code>
            <span class="sw-use-dark-mode-page__state-value">
              {{ isDark ? '"dark"' : '"light"' }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- SwDarkModeToggle Component -->
    <section class="sw-use-dark-mode-page__section">
      <SwHeading :level="2" size="xl">SwDarkModeToggle</SwHeading>
      <SwText color="muted">
        A pre-built icon button that wraps useDarkMode. It shows a sun icon in dark mode and a moon
        in light mode. The component is styled for use on the primary-colored top bar — it uses
        text-text-on-primary so the icon is visible against the dark background.
      </SwText>
      <SwCodeBlock :code="componentCode" language="vue" :show-toolbar="false" />
    </section>
  </SwPage>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-use-dark-mode-page__section {
  @apply flex flex-col gap-4;
}

/* Demo card */
.sw-use-dark-mode-page__demo-card {
  @apply rounded-2xl border border-border overflow-hidden;
}

.sw-use-dark-mode-page__demo-card-topbar {
  @apply flex items-center justify-between px-5 py-3 bg-primary;
}

.sw-use-dark-mode-page__demo-card-topbar-label {
  @apply text-xs font-medium text-text-on-primary opacity-60 select-none;
}

.sw-use-dark-mode-page__demo-card-state {
  @apply flex flex-col gap-4 p-6 bg-surface;
}

.sw-use-dark-mode-page__state-row {
  @apply flex items-center justify-between gap-3;
}

.sw-use-dark-mode-page__state-key {
  @apply text-xs font-mono font-medium text-text-subtle;
}

.sw-use-dark-mode-page__state-value {
  @apply text-xs font-mono text-text-muted;
}

.sw-use-dark-mode-page__state-badge {
  @apply text-[11px] font-semibold px-2 py-0.5 rounded-full font-mono;
}

.sw-use-dark-mode-page__state-badge--active {
  @apply text-primary;
  background: color-mix(in srgb, var(--color-primary) 10%, transparent);
}

.sw-use-dark-mode-page__state-badge--inactive {
  @apply text-text-muted bg-surface-hover;
}
</style>
