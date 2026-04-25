<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = withDefaults(defineProps<{ duration?: number; variant: string }>(), {
  duration: 5000,
});

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
  if (remaining.value > 0) raf = requestAnimationFrame(tick);
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

const seconds = computed(() => Math.ceil(remaining.value / 1000));
</script>

<template>
  <svg ref="svgRef" width="28" height="28" viewBox="0 0 28 28" class="sw-toast__ring" aria-hidden="true">
    <circle cx="14" cy="14" :r="RADIUS" class="sw-toast__ring-track" fill="none" stroke-width="2" />
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
    <text x="14" y="14" class="sw-toast__ring-text" text-anchor="middle" dominant-baseline="middle">
      {{ seconds }}
    </text>
  </svg>
</template>

<style>
@reference "@/styles/tailwind.css";

.sw-toast__ring {
  @apply shrink-0;
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

.sw-toast__ring-text {
  @apply text-xs font-medium fill-text-muted;
  font-family: 'Outfit', sans-serif;
}
</style>
