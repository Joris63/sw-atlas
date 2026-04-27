<script setup lang="ts">
import {
  SwitchRoot,
  SwitchControl,
  SwitchThumb,
  SwitchHiddenInput,
  SwitchLabel,
} from '@ark-ui/vue';
import SwLabel from '@/components/ui/typography/SwLabel.vue';

interface Props {
  modelValue: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  disabled: false,
  label: undefined,
});
const emit = defineEmits<{ 'update:modelValue': [boolean] }>();
</script>

<template>
  <SwitchRoot
    :class="['sw-switch', `sw-switch--${props.size}`]"
    :checked="props.modelValue"
    :disabled="props.disabled"
    @update:checked="emit('update:modelValue', $event)"
  >
    <SwitchControl class="sw-switch__control">
      <SwitchThumb class="sw-switch__thumb" />
    </SwitchControl>
    <SwitchLabel v-if="label" as-child>
      <SwLabel>{{ label }}</SwLabel>
    </SwitchLabel>
    <SwitchHiddenInput />
  </SwitchRoot>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-switch--sm {
  --sw-t: 0.75rem; /* 12px thumb */
  --sw-travel: 1rem; /* 16px travel */
  --sw-w: 2.25rem; /* 36px */
  --sw-h: 1.25rem; /* 20px */
}

.sw-switch--md {
  --sw-t: 1rem; /* 16px thumb */
  --sw-travel: 1.25rem; /* 20px travel */
  --sw-w: 2.75rem; /* 44px */
  --sw-h: 1.5rem; /* 24px */
}

.sw-switch--lg {
  --sw-t: 1.25rem; /* 20px thumb */
  --sw-travel: 1.5rem; /* 24px travel */
  --sw-w: 3.25rem; /* 52px */
  --sw-h: 1.75rem; /* 28px */
}

.sw-switch {
  @apply inline-flex items-center gap-2.5 cursor-pointer;
}

.sw-switch__control {
  @apply inline-flex items-center rounded-full
         bg-surface-hover border border-border
         transition-colors duration-200
         w-(--sw-w) h-(--sw-h) p-[3px];
}

.sw-switch__control[data-state='checked'] {
  @apply bg-primary border-primary;
}

.sw-switch__control[data-disabled] {
  @apply opacity-50 cursor-not-allowed;
}

.sw-switch__thumb {
  @apply rounded-full bg-neutral-400 shrink-0 transition-transform duration-200
         w-(--sw-t) h-(--sw-t);
}

.sw-switch__thumb[data-state='checked'] {
  @apply bg-neutral-0 translate-x-(--sw-travel);
}
</style>
