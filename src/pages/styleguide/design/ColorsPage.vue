<script setup lang="ts">
import SwPage from '@/components/layout/SwPage.vue';
import SwHeading from '@/components/ui/typography/SwHeading.vue';

interface Stop {
  step: string;
  hex: string;
  dark: boolean;
}

const primary: Stop[] = [
  { step: '50', hex: '#eaf6f8', dark: false },
  { step: '100', hex: '#c8eaee', dark: false },
  { step: '200', hex: '#9dd9e0', dark: false },
  { step: '300', hex: '#72c8d2', dark: false },
  { step: '400', hex: '#53c0cb', dark: true },
  { step: '500', hex: '#3da8b4', dark: true },
  { step: '600', hex: '#2a8f9e', dark: true },
  { step: '700', hex: '#1a7585', dark: true },
  { step: '800', hex: '#0d5f6e', dark: true },
  { step: '900', hex: '#004050', dark: true },
  { step: '950', hex: '#002d38', dark: true },
];

const neutral: Stop[] = [
  { step: '0', hex: '#ffffff', dark: false },
  { step: '50', hex: '#f0f7f8', dark: false },
  { step: '100', hex: '#e4f0f2', dark: false },
  { step: '200', hex: '#c8dfe2', dark: false },
  { step: '300', hex: '#a8c8cc', dark: false },
  { step: '400', hex: '#7aaab2', dark: true },
  { step: '500', hex: '#4a7880', dark: true },
  { step: '600', hex: '#3a6068', dark: true },
  { step: '700', hex: '#2a4850', dark: true },
  { step: '800', hex: '#1c3038', dark: true },
  { step: '900', hex: '#0e2028', dark: true },
  { step: '950', hex: '#071418', dark: true },
];

const accent: Stop[] = [
  { step: '50', hex: '#fff1f2', dark: false },
  { step: '100', hex: '#ffe0e2', dark: false },
  { step: '200', hex: '#ffc2c6', dark: false },
  { step: '300', hex: '#ff9aa0', dark: false },
  { step: '400', hex: '#f7606e', dark: true },
  { step: '500', hex: '#e8394a', dark: true },
  { step: '600', hex: '#cc2035', dark: true },
  { step: '700', hex: '#aa1828', dark: true },
  { step: '800', hex: '#8c1520', dark: true },
  { step: '900', hex: '#741319', dark: true },
  { step: '950', hex: '#420a0e', dark: true },
];

interface SemanticToken {
  name: string;
  var: string;
  light: string;
  dark: string;
  usage: string;
}

interface SemanticGroup {
  label: string;
  desc: string;
  tokens: SemanticToken[];
}

const semanticGroups: SemanticGroup[] = [
  {
    label: 'Surfaces',
    desc: 'Layer backgrounds from bg → surface → surface-strong to create visual depth. Never use raw scale values for backgrounds.',
    tokens: [
      {
        name: 'bg',
        var: '--bg',
        light: '#f0f7f8',
        dark: '#071418',
        usage: 'Outermost page background',
      },
      {
        name: 'surface',
        var: '--surface',
        light: '#f7fbfc',
        dark: '#0e2028',
        usage: 'Cards and panel backgrounds',
      },
      {
        name: 'surface-subtle',
        var: '--surface-subtle',
        light: '#e4f0f2',
        dark: '#1c3038',
        usage: 'Inset sections, zebra rows',
      },
      {
        name: 'surface-hover',
        var: '--surface-hover',
        light: '#c8dfe2',
        dark: '#3a6068',
        usage: 'Hover state on interactive rows',
      },
      {
        name: 'surface-strong',
        var: '--surface-strong',
        light: '#ffffff',
        dark: '#2a4850',
        usage: 'Elevated surfaces (topbar, modals)',
      },
    ],
  },
  {
    label: 'Borders',
    desc: 'Use border for default outlines, border-strong for emphasis, and the semantic variants for state.',
    tokens: [
      {
        name: 'border',
        var: '--border',
        light: '#c8dfe2',
        dark: '#2a4850',
        usage: 'Default dividers and outlines',
      },
      {
        name: 'border-strong',
        var: '--border-strong',
        light: '#a8c8cc',
        dark: '#3a6068',
        usage: 'Emphasis, selected state',
      },
      {
        name: 'border-focus',
        var: '--border-focus',
        light: '#53c0cb',
        dark: '#53c0cb',
        usage: 'Focus ring — keyboard nav only',
      },
      {
        name: 'border-invalid',
        var: '--border-invalid',
        light: '#dc2626',
        dark: '#dc2626',
        usage: 'Validation error outline',
      },
    ],
  },
  {
    label: 'Text',
    desc: 'Use text for primary copy, text-muted for supporting info, text-subtle for placeholders and disabled state.',
    tokens: [
      {
        name: 'text',
        var: '--text',
        light: '#0e2028',
        dark: '#f0f7f8',
        usage: 'Primary body copy',
      },
      {
        name: 'text-muted',
        var: '--text-muted',
        light: '#4a7880',
        dark: '#7aaab2',
        usage: 'Secondary labels, metadata',
      },
      {
        name: 'text-subtle',
        var: '--text-subtle',
        light: '#7aaab2',
        dark: '#4a7880',
        usage: 'Placeholders, disabled text',
      },
      {
        name: 'text-inverse',
        var: '--text-inverse',
        light: '#f0f7f8',
        dark: '#f0f7f8',
        usage: 'Text on dark backgrounds',
      },
      {
        name: 'text-on-primary',
        var: '--text-on-primary',
        light: '#ffffff',
        dark: '#002d38',
        usage: 'Text on primary-colored surfaces',
      },
    ],
  },
  {
    label: 'Interactive',
    desc: 'Use primary for all primary actions. Accent is reserved for destructive or urgent actions only.',
    tokens: [
      {
        name: 'primary',
        var: '--color-primary',
        light: '#004050',
        dark: '#53c0cb',
        usage: 'Primary actions, links, active state',
      },
      {
        name: 'primary-hover',
        var: '--color-primary-hover',
        light: '#002d38',
        dark: '#72c8d2',
        usage: 'Hover state on primary elements',
      },
      {
        name: 'accent',
        var: '--color-accent',
        light: '#e8394a',
        dark: '#e8394a',
        usage: 'Destructive / high-urgency actions',
      },
    ],
  },
  {
    label: 'Status',
    desc: 'Use the base color for text/icons, -light for backgrounds, and -dark for text on a -light background.',
    tokens: [
      {
        name: 'success',
        var: '--success',
        light: '#16a34a',
        dark: '#16a34a',
        usage: 'Success text and icons',
      },
      {
        name: 'success-light',
        var: '--success-light',
        light: '#dcfce7',
        dark: '#14532d',
        usage: 'Success banner / badge background',
      },
      {
        name: 'success-dark',
        var: '--success-dark',
        light: '#14532d',
        dark: '#14532d',
        usage: 'Text on success-light background',
      },
      {
        name: 'warning',
        var: '--warning',
        light: '#d97706',
        dark: '#d97706',
        usage: 'Warning text and icons',
      },
      {
        name: 'warning-light',
        var: '--warning-light',
        light: '#fef3c7',
        dark: '#78350f',
        usage: 'Warning banner / badge background',
      },
      {
        name: 'warning-dark',
        var: '--warning-dark',
        light: '#78350f',
        dark: '#78350f',
        usage: 'Text on warning-light background',
      },
      {
        name: 'danger',
        var: '--danger',
        light: '#dc2626',
        dark: '#dc2626',
        usage: 'Error text and icons',
      },
      {
        name: 'danger-light',
        var: '--danger-light',
        light: '#fee2e2',
        dark: '#7f1d1d',
        usage: 'Error banner / badge background',
      },
      {
        name: 'danger-dark',
        var: '--danger-dark',
        light: '#7f1d1d',
        dark: '#7f1d1d',
        usage: 'Text on danger-light background',
      },
    ],
  },
];
</script>

<template>
  <SwPage
    title="Colors"
    description="All color tokens available in the design system — raw scales and semantic tokens."
  >
    <!-- Scales -->
    <div class="sg-section">
      <SwHeading :level="2" size="lg">Primary</SwHeading>
      <div class="color-scale">
        <div v-for="s in primary" :key="s.step" class="color-swatch" :style="{ background: s.hex }">
          <span
            class="color-swatch__step"
            :class="s.dark ? 'color-swatch__label--light' : 'color-swatch__label--dark'"
            >{{ s.step }}</span
          >
          <span
            class="color-swatch__hex"
            :class="s.dark ? 'color-swatch__label--light' : 'color-swatch__label--dark'"
            >{{ s.hex }}</span
          >
        </div>
      </div>
    </div>

    <div class="sg-section">
      <SwHeading :level="2" size="lg">Neutral</SwHeading>
      <div class="color-scale">
        <div v-for="s in neutral" :key="s.step" class="color-swatch" :style="{ background: s.hex }">
          <span
            class="color-swatch__step"
            :class="s.dark ? 'color-swatch__label--light' : 'color-swatch__label--dark'"
            >{{ s.step }}</span
          >
          <span
            class="color-swatch__hex"
            :class="s.dark ? 'color-swatch__label--light' : 'color-swatch__label--dark'"
            >{{ s.hex }}</span
          >
        </div>
      </div>
    </div>

    <div class="sg-section">
      <SwHeading :level="2" size="lg">Accent</SwHeading>
      <div class="color-scale">
        <div v-for="s in accent" :key="s.step" class="color-swatch" :style="{ background: s.hex }">
          <span
            class="color-swatch__step"
            :class="s.dark ? 'color-swatch__label--light' : 'color-swatch__label--dark'"
            >{{ s.step }}</span
          >
          <span
            class="color-swatch__hex"
            :class="s.dark ? 'color-swatch__label--light' : 'color-swatch__label--dark'"
            >{{ s.hex }}</span
          >
        </div>
      </div>
    </div>

    <!-- Semantic tokens -->
    <div v-for="group in semanticGroups" :key="group.label" class="sg-section">
      <div class="sg-section__header">
        <SwHeading :level="2" size="lg">{{ group.label }}</SwHeading>
        <p class="sg-section__desc">{{ group.desc }}</p>
      </div>
      <div class="token-grid">
        <div v-for="token in group.tokens" :key="token.name" class="token-card">
          <div class="token-card__swatch" :style="{ background: `var(${token.var})` }" />
          <div class="token-card__info">
            <span class="token-card__name">{{ token.name }}</span>
            <span class="token-card__usage">{{ token.usage }}</span>
            <span class="token-card__var">{{ token.var }}</span>
            <div class="token-card__values">
              <span class="token-card__value"
                ><span class="token-card__mode">L</span>{{ token.light }}</span
              >
              <span class="token-card__value"
                ><span class="token-card__mode token-card__mode--dark">D</span
                >{{ token.dark }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </SwPage>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sg-section {
  @apply flex flex-col gap-4;
}

/* Scale — mobile: vertical list */
.color-scale {
  @apply flex flex-col rounded-xl overflow-hidden;
}

.color-swatch {
  @apply flex items-center justify-between px-4 h-12;
}

.color-swatch__step {
  @apply text-sm font-semibold;
}

.color-swatch__hex {
  @apply text-sm font-mono;
}

/* Scale — desktop: horizontal strip */
@media (min-width: 1280px) {
  .color-scale {
    @apply flex-row;
  }

  .color-swatch {
    @apply flex-1 flex-col justify-between p-2.5 min-h-24 px-2.5;
    height: auto;
  }

  .color-swatch__step {
    @apply text-xs;
  }

  .color-swatch__hex {
    @apply text-xs;
  }
}

.color-swatch__label--dark {
  color: rgba(0, 0, 0, 0.7);
}

.color-swatch__label--light {
  color: rgba(255, 255, 255, 0.85);
}

.sg-section__header {
  @apply flex flex-col gap-1;
}

.sg-section__desc {
  @apply text-sm text-text-muted;
}

/* Semantic tokens */
.token-grid {
  @apply grid gap-3;
  grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
}

.token-card {
  @apply rounded-lg overflow-hidden border border-border;
}

.token-card__swatch {
  @apply h-16;
}

.token-card__info {
  @apply flex flex-col gap-1 px-3 py-2.5 bg-surface;
}

.token-card__name {
  @apply text-sm font-medium text-text;
}

.token-card__usage {
  @apply text-xs text-text-muted italic;
}

.token-card__var {
  @apply text-xs font-mono text-text-muted;
}

.token-card__values {
  @apply flex flex-col gap-0.5 mt-1;
}

.token-card__value {
  @apply flex items-center gap-1.5 text-xs font-mono text-text-muted;
}

.token-card__mode {
  @apply inline-flex items-center justify-center w-4 h-4 rounded-sm text-xs font-semibold shrink-0 bg-neutral-100 text-neutral-600;
  font-size: 0.6rem;
}

.token-card__mode--dark {
  @apply bg-neutral-800 text-neutral-300;
}
</style>
