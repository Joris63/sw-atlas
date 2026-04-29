<script setup lang="ts">
import { AccordionRoot } from '@ark-ui/vue';

interface Props {
  multiple?: boolean;
  collapsible?: boolean;
  defaultValue?: string[];
}

withDefaults(defineProps<Props>(), {
  multiple: false,
  collapsible: true,
  defaultValue: undefined,
});

const emit = defineEmits<{ 'value-change': [string[]] }>();
</script>

<template>
  <AccordionRoot
    class="sw-accordion"
    :multiple="multiple"
    :collapsible="collapsible"
    :default-value="defaultValue"
    @value-change="emit('value-change', $event.value)"
  >
    <slot />
  </AccordionRoot>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-accordion {
  @apply w-full border border-border rounded-xl overflow-hidden divide-y divide-border;
}
</style>
