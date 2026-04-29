<script setup lang="ts">
import { ref } from 'vue';
import SwPage from '@/components/layout/SwPage.vue';
import SwDialog from '@/components/ui/overlays/SwDialog.vue';
import SwButton from '@/components/ui/buttons/SwButton.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue';

const isOpen = ref(false);

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'open',
    type: 'boolean',
    description: 'Controls the open state of the dialog. Bind with v-model:open.',
    control: 'none',
  },
  {
    name: 'title',
    type: 'string',
    default: '',
    description: 'Title displayed at the top of the dialog.',
    control: 'text',
    initialValue: 'Are you sure?',
    category: 'content',
  },
  {
    name: 'description',
    type: 'string',
    default: '',
    description: 'Supporting text shown below the title.',
    control: 'text',
    initialValue: 'This action cannot be undone. Please confirm you want to proceed.',
    category: 'content',
  },
  {
    name: 'width',
    type: "'sm' | 'md' | 'lg' | string",
    default: 'md',
    description: "Width of the dialog. Accepts 'sm', 'md', 'lg' or any CSS value (e.g. '500px').",
    control: 'text',
    initialValue: 'md',
    category: 'appearance',
  },
  {
    name: 'variant',
    type: "'default' | 'success' | 'danger' | 'warning' | 'info'",
    default: 'default',
    description: 'Sets the icon and primary action color.',
    control: 'select',
    options: ['default', 'success', 'danger', 'warning', 'info'],
    initialValue: 'danger',
    category: 'appearance',
  },
  {
    name: 'persistent',
    type: 'boolean',
    default: false,
    description: 'Disable closing via backdrop click or Escape.',
    control: 'toggle',
    category: 'advanced',
  },
  {
    name: 'lazy',
    type: 'boolean',
    default: true,
    description: 'Unmount content when closed and defer mount until first open.',
    control: 'toggle',
    category: 'advanced',
  },
];
</script>

<template>
  <SwPage
    title="SwDialog"
    description="A modal dialog for confirmations, alerts, and focused interactions. Supports danger, warning, and info variants with an optional confirmation input."
  >
    <SwPlayground :props-config="playgroundConfig" component-name="SwDialog">
      <template #default="{ values }">
        <SwButton label="Open dialog" variant="outline" @click="isOpen = true" />

        <SwDialog
          v-model:open="isOpen"
          :title="values.title"
          :description="values.description || undefined"
          :width="values.width"
          :variant="values.variant"
          :confirm-slug="values.confirmSlug || undefined"
          :persistent="values.persistent"
          :lazy="values.lazy"
          @confirm="isOpen = false"
        >
          <p class="text-sm text-text-muted">
            Drawer content goes here. Use the default slot to render anything inside the body.
          </p>

          <template #footer>
            <SwButton label="Cancel" variant="ghost" @click="isOpen = false" />
            <SwButton label="Delete changes" variant="danger" @click="isOpen = false" />
          </template>
        </SwDialog>
      </template>
    </SwPlayground>
  </SwPage>
</template>
