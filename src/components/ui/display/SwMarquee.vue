<script setup lang="ts">
import {
  MarqueeContent,
  MarqueeEdge,
  MarqueeItem,
  MarqueeRoot,
  MarqueeViewport,
} from '@ark-ui/vue';

import logoArkUI from '@/assets/logos/external/ark-ui.svg?raw';
import logoESLintDark from '@/assets/logos/external/eslint-dark.svg?raw';
import logoESLintLight from '@/assets/logos/external/eslint-light.svg?raw';
import logoJavascript from '@/assets/logos/external/javascript.svg?raw';
import logoLucideDark from '@/assets/logos/external/lucide-dark.svg?raw';
import logoLucideLight from '@/assets/logos/external/lucide-light.svg?raw';
import logoPrettierDark from '@/assets/logos/external/prettier-dark.svg?raw';
import logoPrettierLight from '@/assets/logos/external/prettier-light.svg?raw';
import logoShiki from '@/assets/logos/external/shiki.svg?raw';
import logoTailwindcss from '@/assets/logos/external/tailwindcss.svg?raw';
import logoTypescript from '@/assets/logos/external/typescript.svg?raw';
import logoVite from '@/assets/logos/external/vite.svg?raw';
import logoVue from '@/assets/logos/external/vue.svg?raw';
import logoZod from '@/assets/logos/external/zod.svg?raw';

export interface SwMarqueeItem {
  name: string;
  logo: string;
}

defineProps<{ items: SwMarqueeItem[]; speed?: 25 | 50 | 75 | 100 }>();

const logos: Record<string, string> = {
  'ark-ui': logoArkUI,
  'eslint-dark': logoESLintDark,
  'eslint-light': logoESLintLight,
  javascript: logoJavascript,
  'lucide-dark': logoLucideDark,
  'lucide-light': logoLucideLight,
  'prettier-dark': logoPrettierDark,
  'prettier-light': logoPrettierLight,
  shiki: logoShiki,
  tailwindcss: logoTailwindcss,
  typescript: logoTypescript,
  vite: logoVite,
  vue: logoVue,
  zod: logoZod,
};
</script>

<template>
  <MarqueeRoot auto-fill spacing="1.5rem" class="sw-marquee" :speed="speed">
    <MarqueeEdge side="start" class="sw-marquee__edge sw-marquee__edge--start" />
    <MarqueeViewport class="sw-marquee__viewport">
      <MarqueeContent class="sw-marquee__content">
        <MarqueeItem v-for="item in items" :key="item.name" class="sw-marquee__item">
          <!-- eslint-disable-next-line vue/no-v-html -- bundled SVG asset, not user input -->
          <span v-if="logos[item.logo]" class="sw-marquee__item-logo" v-html="logos[item.logo]" />
          <span class="sw-marquee__item-name">{{ item.name }}</span>
        </MarqueeItem>
      </MarqueeContent>
    </MarqueeViewport>
    <MarqueeEdge side="end" class="sw-marquee__edge sw-marquee__edge--end" />
  </MarqueeRoot>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

/* ---- Root ---- */
.sw-marquee {
  @apply relative w-full overflow-hidden
         rounded-2xl border border-border bg-surface-subtle;
  height: 6.5rem;
}

.sw-marquee[data-paused] *,
.sw-marquee[data-paused] {
  animation-play-state: paused !important;
}

/* ---- Viewport ---- */
.sw-marquee__viewport {
  @apply w-full h-full items-center;
}

/* ---- Content ---- */
.sw-marquee__content {
  animation-timing-function: linear;
  animation-duration: var(--marquee-duration);
  animation-delay: var(--marquee-delay);
  animation-iteration-count: var(--marquee-loop-count);
}

.sw-marquee__content[data-side='start'],
.sw-marquee__content[data-side='end'] {
  animation-name: sw-marquee-x;
}

.sw-marquee__content[data-reverse] {
  animation-direction: reverse;
}

@media (prefers-reduced-motion: reduce) {
  .sw-marquee__content {
    animation: none !important;
  }
}

/* ---- Items ---- */
.sw-marquee__item {
  @apply flex items-center gap-3
         px-5 py-3 h-14
         rounded-xl border border-border bg-surface
         select-none whitespace-nowrap;
}

.sw-marquee__item-logo {
  @apply shrink-0 w-7 h-7;
}

.sw-marquee__item-logo :deep(svg) {
  @apply w-full h-full;
}

.sw-marquee__item-name {
  @apply text-sm font-medium text-text;
}

/* ---- Edges ---- */
.sw-marquee__edge {
  @apply absolute top-0 bottom-0 z-10 pointer-events-none w-1/5;
}

.sw-marquee__edge--start {
  @apply left-0;
  background: linear-gradient(to right, var(--color-surface-subtle), transparent);
}

.sw-marquee__edge--end {
  @apply right-0;
  background: linear-gradient(to left, var(--color-surface-subtle), transparent);
}

/* ---- Keyframes ---- */
@keyframes sw-marquee-x {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(var(--marquee-translate));
  }
}
</style>
