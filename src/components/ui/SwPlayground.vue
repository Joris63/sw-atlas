<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import SwIcon from './SwIcon.vue'
import SwCodeBlock from './SwCodeBlock.vue'
import SwButton from './SwButton.vue'
import SwInput from './SwInput.vue'
import SwSwitch from './SwSwitch.vue'

export interface PlaygroundPropConfig {
  name: string
  type: string
  default?: any
  required?: boolean
  description?: string
  control: 'text' | 'segmented' | 'toggle' | 'none'
  options?: string[]
  initialValue?: any
  isSlotContent?: boolean // rendered as children between open/close tags in code output
  isNumeric?: boolean // use :prop="N" binding syntax in code output
}

const props = defineProps<{
  propsConfig: PlaygroundPropConfig[]
  componentName: string
  previewClass?: string
}>()

const showCode = ref(false)

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
  <div class="sw-pg">
    <!-- Props header -->
    <div class="sw-pg__header">
      <SwIcon name="sliders-horizontal" :size="14" />
      Props
      <span class="sw-pg__badge">{{ controlCount }}</span>
    </div>

    <!-- Prop rows -->
    <div v-for="p in visibleControls" :key="p.name" class="sw-pg__row">
      <span class="sw-pg__prop-name">
        {{ toKebab(p.name) }}
        <span v-if="p.required" class="sw-pg__required">req</span>
      </span>

      <!-- Text input -->
      <SwInput
        v-if="p.control === 'text'"
        v-model="values[p.name]"
        :placeholder="p.default !== undefined ? String(p.default) : ''"
      />

      <!-- Segmented control -->
      <div v-else-if="p.control === 'segmented'" class="sw-pg__seg">
        <SwButton
          v-for="opt in p.options"
          :key="opt"
          :variant="String(values[p.name]) === opt ? 'primary' : 'ghost'"
          :label="opt"
          @click="values[p.name] = opt"
        />
      </div>

      <!-- Toggle switch -->
      <SwSwitch v-else-if="p.control === 'toggle'" v-model="values[p.name]" />
    </div>

    <!-- Live preview -->
    <div class="sw-pg__preview" :class="previewClass">
      <slot :values="values" />
    </div>

    <!-- Code toggle footer -->
    <div class="sw-pg__footer">
      <SwButton
        size="xs"
        variant="ghost"
        icon-left="code-2"
        :icon-right="showCode ? 'chevron-up' : 'chevron-down'"
        :label="showCode ? 'Hide Code' : 'Code'"
        @click="showCode = !showCode"
      />
    </div>

    <!-- Expandable code block -->
    <div class="sw-pg__code-wrap" :class="{ 'sw-pg__code-wrap--open': showCode }">
      <div class="sw-pg__code-inner">
        <SwCodeBlock :code="codeString" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-pg {
  @apply rounded-xl border border-border overflow-hidden;
}

/* ---- Header ---- */
.sw-pg__header {
  @apply flex items-center gap-2 px-4 py-3
         text-sm font-medium text-text-muted bg-surface-subtle
         select-none;
}

.sw-pg__badge {
  @apply inline-flex items-center justify-center
         rounded-full text-xs font-semibold px-1.5 min-w-5 h-5
         bg-surface-hover text-text-muted;
}

/* ---- Prop rows ---- */
.sw-pg__row {
  @apply flex items-center gap-4 px-4 py-2.5 border-t border-border bg-surface;
}

.sw-pg__prop-name {
  @apply font-mono text-xs text-text-muted w-24 shrink-0 flex items-center gap-1.5 flex-wrap;
}

.sw-pg__required {
  @apply text-[10px] font-sans font-semibold px-1 py-px rounded-sm
         text-text-inverse bg-danger leading-none;
}

/* ---- Segmented control ---- */
.sw-pg__seg {
  @apply flex flex-wrap gap-1;
}

/* ---- Preview ---- */
.sw-pg__preview {
  @apply flex flex-wrap items-center justify-center gap-3
         p-8 min-h-24 bg-surface border-t border-border;
}

/* ---- Code footer ---- */
.sw-pg__footer {
  @apply flex justify-end px-3 py-2 border-t border-border;
}

/* ---- Code accordion ---- */
.sw-pg__code-wrap {
  @apply grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 200ms ease;
}

.sw-pg__code-wrap--open {
  grid-template-rows: 1fr;
}

.sw-pg__code-inner {
  @apply overflow-hidden;
}
</style>
