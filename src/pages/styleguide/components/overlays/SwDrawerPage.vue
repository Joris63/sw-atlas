<script setup lang="ts">
import { ref } from 'vue';
import SwPage from '@/components/layout/SwPage.vue';
import SwDrawer from '@/components/ui/overlays/SwDrawer.vue';
import SwButton from '@/components/ui/buttons/SwButton.vue';
import SwPlayground from '@/components/ui/docs/SwPlayground.vue';
import type { PlaygroundPropConfig } from '@/components/ui/docs/SwPlayground.vue';

const isOpen = ref(false);

const playgroundConfig: PlaygroundPropConfig[] = [
  {
    name: 'open',
    type: 'boolean',
    description: 'Controls the open state of the drawer. Bind with v-model:open.',
    control: 'none',
  },
  {
    name: 'title',
    type: 'string',
    default: '',
    description: 'Title shown in the drawer header. Also accepts a #title slot for rich content.',
    control: 'text',
    initialValue: 'Member details',
    category: 'content',
  },
  {
    name: 'description',
    type: 'string',
    default: '',
    description: 'Subtext below the title. Also used by screen readers as the dialog description.',
    control: 'text',
    category: 'content',
  },
  {
    name: 'side',
    type: "'right' | 'left'",
    default: 'right',
    description: 'Which side the drawer slides in from.',
    control: 'select',
    options: ['right', 'left'],
    initialValue: 'right',
    category: 'appearance',
  },
  {
    name: 'width',
    type: "'sm' | 'md' | 'lg' | string",
    default: 'md',
    description:
      "Width of the drawer panel. Accepts 'sm', 'md', 'lg' or any CSS value (e.g. '500px').",
    control: 'text',
    initialValue: 'md',
    category: 'appearance',
  },
  {
    name: 'persistent',
    type: 'boolean',
    default: false,
    description:
      'Disable closing via backdrop click or Escape. Useful for forms with unsaved changes.',
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
    title="SwDrawer"
    description="A side panel that slides in from the left or right. Content and footer are composed via named slots."
  >
    <SwPlayground :props-config="playgroundConfig" component-name="SwDrawer">
      <template #default="{ values }">
        <SwButton label="Open drawer" variant="outline" @click="isOpen = true" />

        <SwDrawer
          v-model:open="isOpen"
          :title="values.title"
          :description="values.description || undefined"
          :side="values.side"
          :width="values.width"
          :persistent="values.persistent"
          :lazy="values.lazy"
        >
          <p class="text-sm text-text-muted">
            Drawer content goes here. Use the default slot to render anything inside the body.
          </p>

          <template #footer>
            <SwButton label="Cancel" variant="ghost" @click="isOpen = false" />
            <SwButton label="Save changes" @click="isOpen = false" />
          </template>
        </SwDrawer>
      </template>
    </SwPlayground>
  </SwPage>
</template>
