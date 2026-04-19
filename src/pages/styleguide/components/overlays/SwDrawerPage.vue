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
    description: 'Title shown in the drawer header.',
    control: 'text',
    initialValue: 'Member details',
  },
  {
    name: 'side',
    type: "'right' | 'left'",
    default: 'right',
    description: 'Which side the drawer slides in from.',
    control: 'select',
    options: ['right', 'left'],
    initialValue: 'right',
  },
  {
    name: 'width',
    type: "'sm' | 'md' | 'lg'",
    default: 'md',
    description: 'Width of the drawer panel.',
    control: 'select',
    options: ['sm', 'md', 'lg'],
    initialValue: 'md',
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
          :side="values.side"
          :width="values.width"
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
