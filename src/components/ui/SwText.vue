<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: string
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
    weight?: 'normal' | 'medium' | 'semibold'
    color?: 'default' | 'muted' | 'subtle' | 'inverse'
  }>(),
  {
    as: 'p',
    size: 'base',
    weight: 'normal',
    color: 'default',
  },
)
</script>

<template>
  <component
    :is="as"
    class="sw-text"
    :class="[`sw-text--${size}`, `sw-text--${weight}`, `sw-text--${color}`]"
  >
    <slot />
  </component>
</template>

<style scoped>
@reference "../../styles/tailwind.css";

.sw-text { @apply leading-normal; }

.sw-text--xs   { @apply text-xs; }
.sw-text--sm   { @apply text-sm; }
.sw-text--base { @apply text-base; }
.sw-text--lg   { @apply text-lg; }
.sw-text--xl   { @apply text-xl; }

.sw-text--normal   { @apply font-normal; }
.sw-text--medium   { @apply font-medium; }
.sw-text--semibold { @apply font-semibold; }

.sw-text--default { @apply text-text; }
.sw-text--muted   { @apply text-text-muted; }
.sw-text--subtle  { @apply text-text-subtle; }
.sw-text--inverse { @apply text-text-inverse; }
</style>
