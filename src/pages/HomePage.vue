<script setup lang="ts">
import SwHeading from '@/components/ui/typography/SwHeading.vue'
import SwText from '@/components/ui/typography/SwText.vue'
import SwIcon from '@/components/ui/SwIcon.vue'

const pillars = [
  {
    icon: 'blocks',
    title: 'Component library',
    desc: 'A curated set of Vue 3 components built on the design token system. Import and use them directly in any project that consumes the sw-atlas package.',
  },
  {
    icon: 'palette',
    title: 'Design tokens',
    desc: 'All colors, spacing, typography, shadows, and radii live as CSS variables. Semantic tokens flip automatically between light and dark mode.',
  },
  {
    icon: 'book-open',
    title: 'Live styleguide',
    desc: 'This application is the living documentation. Every component and token is documented here with live previews and copy-ready code snippets.',
  },
  {
    icon: 'file-code',
    title: 'Coding guidelines',
    desc: 'Conventions and patterns to follow when building with or contributing to SwAtlas — from component structure to token usage to file organization.',
  },
]
</script>

<template>
  <div class="home">
    <div class="home__hero">
      <SwText size="sm" color="muted" class="home__eyebrow">sw-atlas</SwText>
      <SwHeading :level="1" size="4xl">Welcome to SW-Atlas</SwHeading>
      <SwText size="lg" color="muted" class="home__tagline">
        The Sanitairwinkel design system — a Vue 3 component library, token foundation, and live
        styleguide in one package.
      </SwText>
    </div>

    <div class="home__pillars">
      <div v-for="p in pillars" :key="p.title" class="pillar">
        <div class="pillar__icon-wrap">
          <SwIcon :name="p.icon" :size="18" />
        </div>
        <div class="pillar__body">
          <SwHeading :level="3" size="base">{{ p.title }}</SwHeading>
          <SwText size="sm" color="muted">{{ p.desc }}</SwText>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../styles/tailwind.css";

.home {
  @apply flex flex-col gap-12;
}

.home__hero {
  @apply flex flex-col gap-3;
}

.home__eyebrow {
  @apply font-mono tracking-wide uppercase;
}

.home__pillars {
  @apply grid gap-6;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
}

.pillar {
  @apply flex gap-4 p-5 rounded-xl border border-border bg-surface-subtle;
}

.pillar__icon-wrap {
  @apply shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-primary-100 text-primary-700;
}

.pillar__body {
  @apply flex flex-col gap-1.5;
}
</style>
