<script setup lang="ts">
import {
  TooltipArrow,
  TooltipArrowTip,
  TooltipContent,
  TooltipPositioner,
  TooltipRoot,
  TooltipTrigger,
} from '@ark-ui/vue';

interface Props {
  content: string;
  placement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'right';
  disabled?: boolean;
  openDelay?: number;
  closeDelay?: number;
  contentAsHtml?: boolean;
}

withDefaults(defineProps<Props>(), {
  placement: 'top',
  disabled: false,
  openDelay: 400,
  closeDelay: 100,
  contentAsHtml: false,
});
</script>

<template>
  <TooltipRoot
    :disabled="disabled"
    :open-delay="openDelay"
    :close-delay="closeDelay"
    :positioning="{ placement }"
  >
    <TooltipTrigger as-child>
      <slot />
    </TooltipTrigger>
    <Teleport to="body">
      <TooltipPositioner>
        <TooltipContent class="sw-tooltip">
          <TooltipArrow class="sw-tooltip__arrow">
            <TooltipArrowTip class="sw-tooltip__arrow-tip" />
          </TooltipArrow>
          <div v-if="contentAsHtml" v-html="content" />
          <template v-else>
            {{ content }}
          </template>
        </TooltipContent>
      </TooltipPositioner>
    </Teleport>
  </TooltipRoot>
</template>

<style>
@reference "@/styles/tailwind.css";

.sw-tooltip {
  @apply relative bg-neutral-900 text-neutral-0 text-xs font-medium leading-normal py-1.5 px-2.5 rounded-lg max-w-64;
  z-index: 9000;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
}

.sw-tooltip[data-state='open'] {
  animation: sw-tooltip-in 120ms ease both;
}

.sw-tooltip[data-state='closed'] {
  @apply hidden;
}

@keyframes sw-tooltip-in {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.sw-tooltip__arrow {
  --arrow-size: 8px;
  --arrow-background: var(--color-neutral-900, #0e2028);
}

.sw-tooltip__arrow-tip {
  @apply bg-neutral-900;
}
</style>
