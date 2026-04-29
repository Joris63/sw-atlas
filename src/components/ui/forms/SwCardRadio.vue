<script setup lang="ts">
import { onMounted } from 'vue';
import { RadioGroupRoot, RadioGroupItem, RadioGroupItemHiddenInput } from '@ark-ui/vue';
import SwIcon from '../display/SwIcon.vue';

export interface SwCardRadioOption {
  value: string;
  label: string;
  description?: string;
  icon?: string;
  disabled?: boolean;
}

interface Props {
  modelValue?: string;
  options: SwCardRadioOption[];
  layout?: 'stacked' | 'tiled' | 'pill';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  layout: 'stacked',
  disabled: false,
});

const emit = defineEmits<{ 'update:modelValue': [string | null] }>();

onMounted(() => {
  if (!props.modelValue && props.options.length > 0) {
    const first = props.options.find((o) => !o.disabled);
    if (first) {
      emit('update:modelValue', first.value);
    }
  }
});
</script>

<template>
  <RadioGroupRoot
    :class="['sw-card-radio', `sw-card-radio--${layout}`]"
    :model-value="modelValue"
    :disabled="disabled"
    @value-change="emit('update:modelValue', $event.value)"
  >
    <RadioGroupItem
      v-for="opt in options"
      :key="opt.value"
      :value="opt.value"
      :disabled="opt.disabled"
      class="sw-cr-item"
    >
      <!-- Icon -->
      <div v-if="opt.icon" class="sw-cr-icon">
        <SwIcon :name="opt.icon" :size="layout === 'tiled' ? 24 : 20" />
      </div>

      <!-- Body -->
      <div class="sw-cr-body">
        <span class="sw-cr-label">{{ opt.label }}</span>
        <span v-if="opt.description" class="sw-cr-description">{{ opt.description }}</span>
      </div>

      <!-- Indicator -->
      <div class="sw-cr-indicator">
        <!-- Stacked / Tiled: check circle -->
        <template v-if="layout !== 'pill'">
          <SwIcon name="check" :size="12" class="sw-cr-check-icon" />
        </template>
        <!-- Pill: radio bullseye -->
        <template v-else>
          <span class="sw-cr-bullseye" />
        </template>
      </div>

      <RadioGroupItemHiddenInput />
    </RadioGroupItem>
  </RadioGroupRoot>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

/* ============================================================
   STACKED
   ============================================================ */
.sw-card-radio--stacked {
  @apply flex flex-col gap-2;
}

.sw-card-radio--stacked .sw-cr-item {
  @apply flex items-center gap-4 px-4 py-3.5 rounded-xl
         border-2 border-border bg-surface
         cursor-pointer select-none transition-all duration-150;
}

.sw-card-radio--stacked .sw-cr-item[data-state='checked'] {
  @apply border-primary;
  background: color-mix(in srgb, var(--color-primary) 5%, var(--surface));
}

.sw-card-radio--stacked .sw-cr-item[data-disabled] {
  @apply opacity-50 cursor-not-allowed;
}

.sw-card-radio--stacked .sw-cr-icon {
  @apply flex items-center justify-center shrink-0
         w-10 h-10 rounded-lg bg-surface-subtle text-text-muted;
}

.sw-card-radio--stacked .sw-cr-item[data-state='checked'] .sw-cr-icon {
  background: color-mix(in srgb, var(--color-primary) 10%, var(--surface));
  color: var(--color-primary);
}

.sw-card-radio--stacked .sw-cr-indicator {
  @apply ml-auto shrink-0 flex items-center justify-center
         w-5 h-5 rounded-full border-2 border-border bg-surface
         transition-all duration-150;
}

.sw-card-radio--stacked .sw-cr-item[data-state='checked'] .sw-cr-indicator {
  @apply border-primary;
  background: var(--color-primary);
}

.sw-card-radio--stacked .sw-cr-check-icon {
  @apply opacity-0 text-text-on-primary transition-opacity duration-150;
}

.sw-card-radio--stacked .sw-cr-item[data-state='checked'] .sw-cr-check-icon {
  @apply opacity-100;
}

/* ============================================================
   TILED
   ============================================================ */
.sw-card-radio--tiled {
  @apply grid gap-3;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
}

.sw-card-radio--tiled .sw-cr-item {
  @apply relative flex flex-col items-start gap-3 p-4 rounded-xl
         border-2 border-border bg-surface
         cursor-pointer select-none transition-all duration-150;
}

.sw-card-radio--tiled .sw-cr-item[data-state='checked'] {
  @apply border-primary border-2;
  background: color-mix(in srgb, var(--color-primary) 5%, var(--surface));
}

.sw-card-radio--tiled .sw-cr-item[data-disabled] {
  @apply opacity-50 cursor-not-allowed;
}

.sw-card-radio--tiled .sw-cr-icon {
  @apply flex items-center justify-center
         w-10 h-10 rounded-lg bg-surface-subtle text-text-muted;
}

.sw-card-radio--tiled .sw-cr-item[data-state='checked'] .sw-cr-icon {
  background: color-mix(in srgb, var(--color-primary) 10%, var(--surface));
  color: var(--color-primary);
}

.sw-card-radio--tiled .sw-cr-body {
  @apply w-full;
}

.sw-card-radio--tiled .sw-cr-indicator {
  @apply absolute top-3 right-3 flex items-center justify-center
         w-4 h-4 rounded-full border-2 border-border bg-surface
         transition-all duration-150;
}

.sw-card-radio--tiled .sw-cr-item[data-state='checked'] .sw-cr-indicator {
  @apply border-primary;
  background: var(--color-primary);
}

.sw-card-radio--tiled .sw-cr-check-icon {
  @apply opacity-0 text-text-on-primary transition-opacity duration-150;
}

.sw-card-radio--tiled .sw-cr-item[data-state='checked'] .sw-cr-check-icon {
  @apply opacity-100;
}

/* ============================================================
   PILL
   ============================================================ */
.sw-card-radio--pill {
  @apply flex flex-col gap-2;
}

.sw-card-radio--pill .sw-cr-item {
  @apply flex items-center gap-3 px-4 py-3 rounded-full
         border border-border bg-surface
         cursor-pointer select-none transition-all duration-200;
}

.sw-card-radio--pill .sw-cr-item[data-state='checked'] {
  @apply border-primary;
  background: var(--color-primary);
}

.sw-card-radio--pill .sw-cr-item[data-disabled] {
  @apply opacity-50 cursor-not-allowed;
}

.sw-card-radio--pill .sw-cr-icon {
  @apply flex items-center justify-center shrink-0
         w-9 h-9 rounded-full bg-surface-subtle text-text-muted
         transition-colors duration-200;
}

.sw-card-radio--pill .sw-cr-item[data-state='checked'] .sw-cr-icon {
  background: color-mix(in srgb, var(--text-on-primary) 15%, transparent);
  color: var(--text-on-primary);
}

.sw-card-radio--pill .sw-cr-label {
  @apply transition-colors duration-200;
}

.sw-card-radio--pill .sw-cr-description {
  @apply transition-colors duration-200;
}

.sw-card-radio--pill .sw-cr-item[data-state='checked'] .sw-cr-label {
  color: var(--text-on-primary);
}

.sw-card-radio--pill .sw-cr-item[data-state='checked'] .sw-cr-description {
  color: color-mix(in srgb, var(--text-on-primary) 70%, transparent);
}

.sw-card-radio--pill .sw-cr-indicator {
  @apply ml-auto shrink-0 flex items-center justify-center w-5 h-5 transition-all duration-200;
}

/* Bullseye (pill radio indicator) */
.sw-cr-bullseye {
  @apply block w-5 h-5 rounded-full border-2 border-border bg-surface transition-all duration-200;
  transition: border-width 75ms ease-in-out;
}

.sw-card-radio--pill .sw-cr-item[data-state='checked'] .sw-cr-bullseye {
  @apply border-[5px];
  border-color: var(--text-on-primary);
  background: transparent;
}

/* ============================================================
   SHARED
   ============================================================ */
.sw-cr-body {
  @apply flex flex-col gap-0.5 flex-1 min-w-0;
}

.sw-cr-label {
  @apply text-sm font-semibold text-text leading-snug;
}

.sw-cr-description {
  @apply text-xs text-text-muted leading-snug;
}
</style>
