<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { codeToHtml } from 'shiki';
import SwButton from '../buttons/SwButton.vue';

const props = defineProps<{
  code: string;
  language?: string;
  showToolbar?: boolean;
}>();

const highlighted = ref('');
const copied = ref(false);

watchEffect(() => {
  void codeToHtml(props.code.trim(), {
    lang: props.language ?? 'vue',
    theme: 'dark-plus',
  }).then((html) => {
    highlighted.value = html;
  });
});

async function copy() {
  await navigator.clipboard.writeText(props.code);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
}
</script>

<template>
  <div class="sw-code-block">
    <div v-if="showToolbar !== false" class="sw-code-block__toolbar">
      <span class="sw-code-block__lang">{{ props.language ?? 'vue' }}</span>
      <SwButton
        size="xs"
        variant="plain"
        :icon-left="copied ? 'check' : 'copy'"
        :label="copied ? 'Copied' : 'Copy'"
        class="sw-code-block__copy"
        @click="copy"
      />
    </div>
    <!-- eslint-disable-next-line vue/no-v-html -- Shiki-generated HTML, not user input -->
    <div class="sw-code-block__pre" v-html="highlighted" />
  </div>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-code-block {
  @apply bg-neutral-950 border-t border-neutral-800;
}

.sw-code-block__toolbar {
  @apply flex items-center justify-between px-5 py-2 bg-neutral-900 border-b border-neutral-800;
}

.sw-code-block__lang {
  @apply text-xs font-medium font-mono text-neutral-500;
}

:deep(.sw-code-block__copy.sw-button) {
  @apply bg-transparent text-neutral-400;
}

:deep(.sw-code-block__copy.sw-button:not(:disabled):hover) {
  @apply text-neutral-0 bg-neutral-800;
}

.sw-code-block__pre {
  @apply m-0 overflow-x-auto text-sm font-mono leading-relaxed;
}

/* Shiki wraps output in <pre><code> — strip its default styles */
:deep(.sw-code-block__pre pre) {
  @apply m-0 px-5 py-4 bg-transparent! font-mono text-sm leading-relaxed;
}
</style>
