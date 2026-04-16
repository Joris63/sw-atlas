<script setup lang="ts">
import { computed } from 'vue'
import { FieldRoot, FieldInput } from '@ark-ui/vue'

interface Props {
  modelValue?: string
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), { modelValue: '', size: 'md', disabled: false })
const emit = defineEmits<{ 'update:modelValue': [string] }>()

const inputValue = computed({
  get: () => props.modelValue ?? '',
  set: (v: string) => emit('update:modelValue', v),
})
</script>

<template>
  <FieldRoot
    :class="['sw-input-field', `sw-input-field--${props.size}`]"
    :disabled="props.disabled"
  >
    <FieldInput v-model="inputValue" class="sw-input" :placeholder="props.placeholder" />
  </FieldRoot>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-input-field {
  @apply flex-1;
}

.sw-input {
  @apply w-full px-3 rounded-md
         bg-surface-subtle border border-border text-text
         placeholder:text-text-subtle
         focus:outline-none focus:border-border-focus
         transition-colors duration-150;
}

/* ---- Sizes ---- */
.sw-input-field--sm .sw-input {
  @apply h-7 text-xs px-2;
}

.sw-input-field--md .sw-input {
  @apply h-9 text-sm px-3;
}

.sw-input-field--lg .sw-input {
  @apply h-10 text-base px-3;
}

.sw-input:disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>
