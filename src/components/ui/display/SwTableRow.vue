<script setup lang="ts">
interface Props {
  selected?: boolean;
  disabled?: boolean;
  clickable?: boolean;
}

withDefaults(defineProps<Props>(), {
  selected: false,
  disabled: false,
  clickable: false,
});

defineEmits<{ click: [MouseEvent] }>();
</script>

<template>
  <tr
    :class="[
      'sw-table-row',
      {
        'sw-table-row--selected': selected,
        'sw-table-row--disabled': disabled,
        'sw-table-row--clickable': clickable,
      },
    ]"
    @click="$emit('click', $event)"
  >
    <slot />
  </tr>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-table-row {
  @apply bg-surface border-b border-border last:border-b-0 transition-colors duration-100;
}

.sw-table-row--clickable {
  @apply cursor-pointer;
}

.sw-table-row--clickable:hover:not(.sw-table-row--selected) {
  @apply bg-surface-subtle;
}

.sw-table-row--selected {
  background: color-mix(in srgb, var(--color-primary) 6%, var(--surface));
}

.sw-table-row--disabled {
  @apply opacity-50 pointer-events-none;
}
</style>
