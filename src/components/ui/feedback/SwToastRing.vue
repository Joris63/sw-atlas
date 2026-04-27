<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import SwIcon from '../SwIcon.vue';

const props = withDefaults(defineProps<{ duration?: number; variant: string }>(), {
  duration: 5000,
});

const emit = defineEmits<{ close: [] }>();

const RADIUS = 11;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const remaining = ref(props.duration);
const svgRef = ref<SVGElement | null>(null);

let startedAt = 0;
let elapsedWhenPaused = 0;
let raf = 0;
let toastRoot: Element | null = null;

function tick() {
  remaining.value = Math.max(0, props.duration - elapsedWhenPaused - (Date.now() - startedAt));
  if (remaining.value > 0) {
    raf = requestAnimationFrame(tick);
  }
}

function pause() {
  cancelAnimationFrame(raf);
  elapsedWhenPaused += Date.now() - startedAt;
}

function resume() {
  startedAt = Date.now();
  raf = requestAnimationFrame(tick);
}

onMounted(() => {
  startedAt = Date.now();
  raf = requestAnimationFrame(tick);

  toastRoot = svgRef.value?.closest('[data-scope="toast"]') ?? null;
  if (toastRoot) {
    toastRoot.addEventListener('mouseenter', pause);
    toastRoot.addEventListener('mouseleave', resume);
  }
});

onUnmounted(() => {
  cancelAnimationFrame(raf);
  if (toastRoot) {
    toastRoot.removeEventListener('mouseenter', pause);
    toastRoot.removeEventListener('mouseleave', resume);
  }
});

const dashOffset = computed(() => {
  const progress = remaining.value / props.duration;
  return CIRCUMFERENCE * (1 - progress);
});
</script>

<template>
  <button class="sw-toast__ring-btn" aria-label="Close" @click="emit('close')">
    <svg
      ref="svgRef"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      class="sw-toast__ring"
      aria-hidden="true"
    >
      <circle
        cx="14"
        cy="14"
        :r="RADIUS"
        class="sw-toast__ring-track"
        fill="none"
        stroke-width="2"
      />
      <circle
        cx="14"
        cy="14"
        :r="RADIUS"
        :class="['sw-toast__ring-progress', `sw-toast__ring-progress--${variant}`]"
        fill="none"
        stroke-width="2"
        :stroke-dasharray="CIRCUMFERENCE"
        :stroke-dashoffset="dashOffset"
        transform="rotate(-90 14 14)"
      />
    </svg>

    <!-- × always visible, centered over the ring -->
    <span class="sw-toast__ring-x">
      <SwIcon name="x" :size="11" />
    </span>
  </button>
</template>

<style>
@reference "@/styles/tailwind.css";

.sw-toast__ring-btn {
  @apply relative shrink-0 w-7 h-7 rounded-full cursor-pointer;
}

.sw-toast__ring {
  @apply transition-opacity duration-150;
}

.sw-toast__ring-btn:hover .sw-toast__ring {
  @apply opacity-50;
}

.sw-toast__ring-track {
  stroke: var(--border-strong);
}

.sw-toast__ring-progress--success {
  stroke: var(--success);
}
.sw-toast__ring-progress--info {
  stroke: var(--primary-400);
}
.sw-toast__ring-progress--warning {
  stroke: var(--warning);
}
.sw-toast__ring-progress--error {
  stroke: var(--danger);
}

.sw-toast__ring-x {
  @apply absolute inset-0 flex items-center justify-center
         text-text pointer-events-none opacity-60
         transition-opacity duration-150;
}

.sw-toast__ring-btn:hover .sw-toast__ring-x {
  @apply opacity-100;
}
</style>
