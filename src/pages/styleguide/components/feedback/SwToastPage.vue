<script setup lang="ts">
import { ref, computed } from 'vue';
import SwPage from '@/components/layout/SwPage.vue';
import SwButton from '@/components/ui/buttons/SwButton.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue';
import { useToast } from '@/composables/useToast';

const toast = useToast();

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'variant',
    type: "'success' | 'info' | 'warning' | 'error'",
    default: 'success',
    description: 'Visual style and icon of the toast.',
    control: 'select',
    options: ['success', 'info', 'warning', 'error'],
  },
  {
    name: 'title',
    type: 'string',
    description: 'Main message shown in the toast.',
    control: 'text',
    initialValue: 'Changes saved',
    required: true,
  },
  {
    name: 'description',
    type: 'string',
    description: 'Optional supporting text shown below the title.',
    control: 'text',
    initialValue: 'Your changes have been saved.',
  },
  {
    name: 'duration',
    type: 'number',
    description: 'How long the toast stays visible in milliseconds.',
    control: 'select',
    options: ['2000', '5000', '8000', '10000'],
    initialValue: '5000',
  },
];

const currentValues = ref<Record<string, string>>({
  variant: 'success',
  title: 'Changes saved',
  description: 'Your changes have been saved.',
  duration: '5000',
});

const ICON_MAP: Record<string, string> = {
  success: 'circle-check',
  info: 'info',
  warning: 'triangle-alert',
  error: 'circle-x',
};

function triggerToast(values: Record<string, string>) {
  currentValues.value = { ...values };
  const method = values.variant as 'success' | 'info' | 'warning' | 'error';
  toast[method](values.title || 'Toast title', {
    description: values.description || undefined,
    duration: values.duration ? Number(values.duration) : undefined,
  });
}

const customCode = computed(() => {
  const { variant, title, description, duration } = currentValues.value;
  const method = variant || 'success';
  const t = title || 'Toast title';
  const hasOpts = description || (duration && duration !== '5000');
  const lines: string[] = [];

  if (hasOpts) {
    lines.push(`toast.${method}('${t}', {`);
    if (description) {
      lines.push(`  description: '${description}',`);
    }
    if (duration && duration !== '5000') {
      lines.push(`  duration: ${duration},`);
    }
    lines.push('});');
  } else {
    lines.push(`toast.${method}('${t}');`);
  }

  return `const toast = useToast();\n\n${lines.join('\n')}`;
});
</script>

<template>
  <SwPage
    title="SwToast"
    description="Ephemeral notifications that slide in from the top-right. Use useToast() to trigger them from anywhere."
  >
    <SwPlayground
      :props-config="playgroundConfig"
      component-name="useToast"
      :custom-code="customCode"
      language="typescript"
    >
      <template #default="{ values }">
        <SwButton
          label="Show toast"
          :icon-left="ICON_MAP[values.variant] ?? 'info'"
          variant="outline"
          @click="triggerToast(values)"
        />
      </template>
    </SwPlayground>
  </SwPage>
</template>
