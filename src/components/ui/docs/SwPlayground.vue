<script setup lang="ts">
import { computed, reactive } from 'vue'
import SwIcon from '../SwIcon.vue'
import SwCodeBlock from './SwCodeBlock.vue'
import SwButton from '../buttons/SwButton.vue'
import SwInput from '../forms/SwInput.vue'
import SwSwitch from '../forms/SwSwitch.vue'
import SwIconInput from '../forms/SwIconInput.vue'

export interface PlaygroundPropConfig {
  name: string
  type: string
  default?: any
  required?: boolean
  description?: string
  control: 'text' | 'segmented' | 'toggle' | 'icon' | 'none'
  options?: string[]
  initialValue?: any
  isSlotContent?: boolean // rendered as children between open/close tags in code output
  isNumeric?: boolean // use :prop="N" binding syntax in code output
}

const props = defineProps<{
  propsConfig: PlaygroundPropConfig[]
  componentName: string
  previewClass?: string
  stacked?: boolean
}>()

const values = reactive<Record<string, any>>(
  Object.fromEntries(
    props.propsConfig
      .filter((p) => p.control !== 'none')
      .map((p) => {
        const initial =
          p.initialValue !== undefined
            ? p.initialValue
            : p.default !== undefined
              ? p.default
              : p.control === 'toggle'
                ? false
                : ''
        return [p.name, initial]
      }),
  ),
)

function toKebab(name: string): string {
  return name.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`)
}

const codeString = computed(() => {
  const parts: string[] = []
  let slotContent: string | null = null

  for (const p of props.propsConfig) {
    if (p.control === 'none') continue

    const v = values[p.name]

    if (p.isSlotContent) {
      slotContent = v || null
      continue
    }

    const defaultVal = p.default !== undefined ? p.default : p.control === 'toggle' ? false : ''

    const key = toKebab(p.name)

    if (p.required) {
      parts.push(p.isNumeric ? `:${key}="${v}"` : `${key}="${v}"`)
    } else {
      if (v === defaultVal || v === undefined || v === null || v === '') continue
      if (v === true) {
        parts.push(key)
      } else if (p.isNumeric) {
        parts.push(`:${key}="${v}"`)
      } else {
        parts.push(`${key}="${v}"`)
      }
    }
  }

  const attrsStr = parts.length > 0 ? ` ${parts.join(' ')}` : ''

  if (slotContent !== null) {
    return `<${props.componentName}${attrsStr}>${slotContent}</${props.componentName}>`
  }

  const selfClose = `<${props.componentName}${attrsStr} />`
  if (selfClose.length <= 80) return selfClose

  return `<${props.componentName}\n  ${parts.join('\n  ')}\n/>`
})

const visibleControls = computed(() => props.propsConfig.filter((p) => p.control !== 'none'))
const controlCount = computed(() => props.propsConfig.filter((p) => p.control !== 'none').length)
</script>

<template>
  <div class="sw-playground">
    <!-- Main body: controls left, preview right on desktop (unless stacked) -->
    <div class="sw-playground__body" :class="{ 'sw-playground__body--stacked': stacked }">
      <!-- Controls panel -->
      <div class="sw-playground__controls">
        <div class="sw-playground__controls-header">
          <SwIcon name="sliders-horizontal" :size="13" />
          <span>Props</span>
          <span class="sw-playground__badge">{{ controlCount }}</span>
        </div>

        <div class="sw-playground__controls-list">
          <div v-for="p in visibleControls" :key="p.name" class="sw-playground__row">
            <span class="sw-playground__prop-name">
              {{ toKebab(p.name) }}
              <span v-if="p.required" class="sw-playground__required">req</span>
            </span>
            <div class="sw-playground__control">
              <!-- Text input -->
              <SwInput
                v-if="p.control === 'text'"
                v-model="values[p.name]"
                :placeholder="p.default !== undefined ? String(p.default) : ''"
              />
              <!-- Segmented control -->
              <div v-else-if="p.control === 'segmented'" class="sw-playground__seg">
                <SwButton
                  v-for="opt in p.options"
                  :key="opt"
                  size="xs"
                  :variant="String(values[p.name]) === opt ? 'primary' : 'outline'"
                  :label="opt"
                  @click="values[p.name] = opt"
                />
              </div>
              <!-- Toggle switch -->
              <SwSwitch v-else-if="p.control === 'toggle'" v-model="values[p.name]" />
              <!-- Icon picker -->
              <SwIconInput v-else-if="p.control === 'icon'" v-model="values[p.name]" />
            </div>
          </div>
        </div>
      </div>

      <!-- Preview panel -->
      <div class="sw-playground__preview" :class="previewClass">
        <slot :values="values" />
      </div>
    </div>

    <!-- Code block — always visible -->
    <div class="sw-playground__code">
      <div class="sw-playground__code-label">
        <SwIcon name="code-2" :size="13" />
        Code
      </div>
      <SwCodeBlock :code="codeString" />
    </div>
  </div>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

/* ---- Shell ---- */
.sw-playground {
  @apply rounded-2xl border border-border shadow-sm;
}

/* ---- Body: side-by-side on lg (unless stacked) ---- */
.sw-playground__body {
  @apply flex flex-col lg:flex-row;
}

.sw-playground__body--stacked {
  @apply lg:flex-col;
}

/* ---- Controls panel ---- */
.sw-playground__controls {
  @apply bg-surface-subtle border-b border-border
         rounded-t-2xl
         lg:border-b-0 lg:border-r lg:w-2xs lg:shrink-0
         lg:rounded-t-none lg:rounded-tl-2xl;
}

.sw-playground__body--stacked .sw-playground__controls {
  @apply lg:border-r-0 lg:border-b lg:w-auto lg:shrink lg:rounded-tl-2xl lg:rounded-tr-2xl;
}

.sw-playground__controls-header {
  @apply flex items-center gap-2 px-4 py-3
         text-xs font-semibold tracking-wider uppercase
         text-text-subtle border-b border-border select-none;
}

.sw-playground__badge {
  @apply ml-auto inline-flex items-center justify-center
         rounded-full text-xs font-semibold px-1.5 min-w-5 h-5
         bg-surface-hover text-text-muted;
}

.sw-playground__controls-list {
  @apply py-1;
}

/* ---- Prop rows ---- */
.sw-playground__row {
  @apply flex items-center gap-3 px-4 py-2;
}

.sw-playground__prop-name {
  @apply font-mono text-xs text-text-muted w-24 shrink-0
         flex items-center gap-1.5 flex-wrap leading-tight;
}

.sw-playground__required {
  @apply text-[10px] font-sans font-semibold px-1 py-px rounded-sm
         text-text-inverse bg-danger leading-none;
}

.sw-playground__control {
  @apply flex-1 min-w-0;
}

.sw-playground__seg {
  @apply flex flex-wrap gap-1;
}

/* ---- Ensure controls stand out against the subtle panel bg ---- */
.sw-playground__controls :deep(.sw-input__input) {
  @apply bg-surface-strong;
}

.sw-playground__controls :deep(.sw-button--outline) {
  @apply bg-surface-strong;
}

/* ---- Preview panel ---- */
.sw-playground__preview {
  @apply flex flex-wrap items-center justify-center gap-3
         p-10 bg-surface flex-1 lg:rounded-tr-2xl min-h-40;
  background-image: radial-gradient(
    var(--border) 1px,
    transparent 1px
  ); /* no @apply for gradients with CSS vars */
  background-size: 20px 20px;
}

/* ---- Code section ---- */
.sw-playground__code {
  @apply border-t border-border rounded-b-2xl overflow-hidden;
}

.sw-playground__code-label {
  @apply flex items-center gap-2 px-4 py-2.5
         text-xs font-semibold tracking-wider uppercase
         text-text-subtle bg-surface-subtle border-b border-border select-none;
}
</style>
