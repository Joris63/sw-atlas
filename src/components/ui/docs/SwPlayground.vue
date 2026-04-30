<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import SwIcon from '../display/SwIcon.vue';
import SwCodeBlock from './SwCodeBlock.vue';
import SwInputText from '../forms/SwInputText.vue';
import SwSwitch from '../forms/SwSwitch.vue';
import SwSelect from '../forms/SwSelect.vue';
import SwIconInput from './SwIconInput.vue';
import SwTooltip from '../overlays/SwTooltip.vue';

export interface PlaygroundPreset {
  label: string;
  value: any;
}

export interface PlaygroundPropConfig {
  name: string;
  label?: string;
  type?: string;
  default?: any;
  required?: boolean;
  description?: string;
  control: 'text' | 'select' | 'toggle' | 'icon' | 'preset' | 'none';
  options?: string[];
  presets?: PlaygroundPreset[];
  initialValue?: any;
  isSlotContent?: boolean;
  isNumeric?: boolean;
  component?: string;
  category?: string;
  showWhen?: (values: Record<string, any>) => boolean;
}

const props = withDefaults(
  defineProps<{
    propsConfig: PlaygroundPropConfig[];
    componentName: string;
    previewClass?: string;
    stacked?: boolean;
    customCode?: string | ((values: Record<string, any>) => string);
    language?: string;
    overrides?: Record<string, any>;
    categoryLabels?: Record<string, string>;
    componentLabels?: Record<string, string>;
  }>(),
  {
    previewClass: undefined,
    customCode: undefined,
    language: 'vue-html',
    overrides: undefined,
    categoryLabels: undefined,
    componentLabels: undefined,
  },
);

const DEFAULT_CATEGORY_LABELS: Record<string, string> = {
  playground: 'Playground example',
  content: 'Content',
  appearance: 'Appearance',
  field: 'Field',
  validation: 'Validation',
  state: 'State',
  advanced: 'Advanced',
};

const CATEGORY_LABELS = computed(() => ({
  ...DEFAULT_CATEGORY_LABELS,
  ...props.categoryLabels,
}));

const CATEGORY_ORDER = computed(() => {
  const custom = Object.keys(props.categoryLabels ?? {});
  const defaults = Object.keys(DEFAULT_CATEGORY_LABELS);
  return [...custom, ...defaults.filter((k) => !custom.includes(k))];
});

const route = useRoute();

function getDefaultValue(p: PlaygroundPropConfig): any {
  if (p.control === 'preset' && p.presets?.length) {
    return p.presets[0]?.value;
  }
  if (p.initialValue !== undefined) {
    return p.initialValue;
  }
  if (p.default !== undefined) {
    return p.default;
  }
  if (p.control === 'toggle') {
    return false;
  }
  return '';
}

function getInitialValue(p: PlaygroundPropConfig): any {
  const urlVal = route.query[p.name];
  if (urlVal !== undefined) {
    if (p.control === 'toggle') {
      return urlVal === 'true';
    }
    try {
      return JSON.parse(String(urlVal));
    } catch {
      return String(urlVal);
    }
  }
  return getDefaultValue(p);
}

const values = reactive<Record<string, any>>(
  Object.fromEntries(
    props.propsConfig.filter((p) => p.control !== 'none').map((p) => [p.name, getInitialValue(p)]),
  ),
);

const selectedPresetIndex = reactive<Record<string, number>>(
  Object.fromEntries(
    props.propsConfig.filter((p) => p.control === 'preset').map((p) => [p.name, 0]),
  ),
);

watch(
  () => props.overrides,
  (newOverrides) => {
    if (!newOverrides) {
      return;
    }

    for (const [key, val] of Object.entries(newOverrides)) {
      if (key in values) {
        values[key] = val;
      }
    }
  },
  { deep: true },
);

watch(
  values,
  (newVals) => {
    const query: Record<string, string> = {};
    for (const [key, val] of Object.entries(newVals)) {
      if (val !== undefined && val !== null && val !== '' && val !== false) {
        query[key] = typeof val === 'object' ? JSON.stringify(val) : String(val);
      }
    }
    const searchStr = new URLSearchParams(query).toString();
    const newHash = `#${route.path}${searchStr ? `?${searchStr}` : ''}`;
    const newUrl = location.pathname + newHash;
    if (location.pathname + location.hash !== newUrl) {
      history.replaceState(history.state, '', newUrl);
    }
  },
  { deep: true },
);

function toKebab(name: string): string {
  return name.replace(/([A-Z])/g, (char) => `-${char.toLowerCase()}`);
}

function getLabel(p: PlaygroundPropConfig): string {
  return p.label ?? toKebab(p.name);
}

function getTooltip(p: PlaygroundPropConfig): string {
  const parts: string[] = [];
  if (p.description) {
    parts.push(`<li>${p.description}</li>`);
  }
  if (p.type) {
    parts.push(`<li>Type: ${p.type}</li>`);
  }
  if (p.required) {
    parts.push('<li>Required</li>');
  }
  if (p.default !== undefined) {
    parts.push(`<li>Default: ${p.default}</li>`);
  }
  return `<ul>${parts.join('\n')}</ul>`;
}

const visibleProps = computed(() =>
  props.propsConfig.filter((p) => !p.showWhen || p.showWhen(values)),
);

const hasCategories = computed(() => props.propsConfig.some((p) => p.category));

const grouped = computed((): [string, PlaygroundPropConfig[]][] => {
  if (!hasCategories.value) {
    return [['', visibleProps.value]];
  }
  const map = new Map<string, PlaygroundPropConfig[]>();
  for (const p of visibleProps.value) {
    const cat = p.category ?? 'advanced';
    const existing = map.get(cat);
    if (existing) {
      existing.push(p);
    } else {
      map.set(cat, [p]);
    }
  }
  return CATEGORY_ORDER.value.flatMap((c) => {
    const items = map.get(c);
    return items ? [[c, items] as [string, PlaygroundPropConfig[]]] : [];
  });
});

// Two-level grouping: component → categories → props
const hasComponents = computed(() => props.propsConfig.some((p) => p.component));

interface ComponentGroup {
  key: string;
  label: string;
  categories: [string, PlaygroundPropConfig[]][];
}

const groupedByComponent = computed((): ComponentGroup[] => {
  const compMap = new Map<string, Map<string, PlaygroundPropConfig[]>>();
  const compOrder: string[] = [];

  for (const p of visibleProps.value) {
    const comp = p.component ?? '';
    const cat = p.category ?? '';

    let catMap = compMap.get(comp);
    if (!catMap) {
      catMap = new Map();
      compMap.set(comp, catMap);
      compOrder.push(comp);
    }
    let catProps = catMap.get(cat);
    if (!catProps) {
      catProps = [];
      catMap.set(cat, catProps);
    }
    catProps.push(p);
  }

  return compOrder.map((compKey) => {
    const catMap = compMap.get(compKey) ?? new Map<string, PlaygroundPropConfig[]>();
    const categories: [string, PlaygroundPropConfig[]][] = CATEGORY_ORDER.value.flatMap((c) => {
      const ps = catMap.get(c);
      return ps ? [[c, ps] as [string, PlaygroundPropConfig[]]] : [];
    });
    for (const [c, ps] of catMap.entries()) {
      if (!CATEGORY_ORDER.value.includes(c)) {
        categories.push([c, ps]);
      }
    }
    return {
      key: compKey,
      label: props.componentLabels?.[compKey] ?? compKey,
      categories,
    };
  });
});

const controlCount = computed(() => props.propsConfig.filter((p) => p.control !== 'none').length);

const selectedComponent = ref(groupedByComponent.value[0]?.key ?? '');

const activeComponentGroup = computed(
  () =>
    groupedByComponent.value.find((g) => g.key === selectedComponent.value) ??
    groupedByComponent.value[0],
);

const collapsedCategories = ref<Set<string>>(new Set());

function toggleCategory(cat: string) {
  if (collapsedCategories.value.has(cat)) {
    collapsedCategories.value.delete(cat);
  } else {
    collapsedCategories.value.add(cat);
  }
}

function toggleAllCategoriesInsideCurrentComponent() {
  const currentComponentGroup = groupedByComponent.value.find(
    ({ key }) => key === selectedComponent.value,
  );

  if (!currentComponentGroup) {
    return;
  }

  const collapsedCategoriesAsArray = [...collapsedCategories.value];
  if (collapsedCategoriesAsArray.filter((v) => v.includes(currentComponentGroup.key)).length > 0) {
    collapsedCategories.value = new Set(
      collapsedCategoriesAsArray.filter((v) => !v.includes(currentComponentGroup.key)),
    );
  } else {
    currentComponentGroup.categories.forEach(([cat]) => {
      const catName = `${currentComponentGroup.key}:${cat}`;
      if (!collapsedCategories.value.has(catName)) {
        collapsedCategories.value.add(catName);
      }
    });
  }
}

function toggleAllCategories() {
  if (!hasComponents.value) {
    if (collapsedCategories.value.size > 0) {
      collapsedCategories.value.clear();
    } else {
      grouped.value.forEach(([cat]) => {
        if (!collapsedCategories.value.has(cat)) {
          collapsedCategories.value.add(cat);
        }
      });
    }
  } else {
    toggleAllCategoriesInsideCurrentComponent();
  }
}

function resetToDefaults() {
  for (const p of props.propsConfig) {
    if (p.control === 'none') {
      continue;
    }
    values[p.name] = getDefaultValue(p);
    if (p.control === 'preset') {
      selectedPresetIndex[p.name] = 0;
    }
  }
}

function selectPreset(p: PlaygroundPropConfig, i: number) {
  if (!p.presets?.[i]) {
    return;
  }
  selectedPresetIndex[p.name] = i;
  values[p.name] = p.presets[i].value;
}

function serializeItem(item: Record<string, any>): string {
  const extras = Object.entries(item)
    .filter(
      ([key, val]) =>
        key !== 'value' && val !== '' && val !== false && val !== null && val !== undefined,
    )
    .map(([key, val]) => `${key}: '${val}'`)
    .join(', ');
  return `{ value: '${item.value}'${extras ? `, ${extras}` : ''} }`;
}

const codeString = computed(() => {
  const parts: string[] = [];
  let slotContent: string | null = null;

  for (const p of props.propsConfig) {
    if (p.control === 'none') {
      continue;
    }
    const v = values[p.name];

    if (p.isSlotContent) {
      slotContent = typeof v === 'string' && v !== '' ? v : null;
      continue;
    }

    const key = toKebab(p.name);

    if (p.control === 'preset') {
      if (Array.isArray(v)) {
        const arr = v.map((item: Record<string, any>) => serializeItem(item)).join(', ');
        parts.push(`:${key}="[${arr}]"`);
      } else {
        parts.push(`${key}="${v}"`);
      }
      continue;
    }

    const defaultValue = p.default !== undefined ? p.default : p.control === 'toggle' ? false : '';

    if (p.required) {
      parts.push(p.isNumeric ? `:${key}="${v}"` : `${key}="${v}"`);
    } else {
      if (v === defaultValue || v === undefined || v === null || v === '') {
        continue;
      }
      if (v === true) {
        parts.push(key);
      } else if (p.isNumeric) {
        parts.push(`:${key}="${v}"`);
      } else {
        parts.push(`${key}="${v}"`);
      }
    }
  }

  const attrsStr = parts.length ? ` ${parts.join(' ')}` : '';
  if (slotContent !== null) {
    return `<${props.componentName}${attrsStr}>${slotContent}</${props.componentName}>`;
  }
  const self = `<${props.componentName}${attrsStr} />`;
  if (self.length <= 80) {
    return self;
  }
  return `<${props.componentName}\n  ${parts.join('\n  ')}\n/>`;
});

const resolvedCode = computed(() => {
  if (!props.customCode) {
    return codeString.value;
  }
  return typeof props.customCode === 'function' ? props.customCode(values) : props.customCode;
});

const copied = ref(false);

async function copyCode() {
  await navigator.clipboard.writeText(resolvedCode.value);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 1500);
}
</script>

<template>
  <div class="sw-playground">
    <div class="sw-playground__body" :class="{ 'sw-playground__body--stacked': stacked }">
      <!-- Controls panel -->
      <div class="sw-playground__controls">
        <div class="sw-playground__controls-header">
          <SwIcon name="sliders-horizontal" :size="13" class="shrink-0" />
          <span>Props</span>
          <span class="sw-playground__badge">{{ controlCount }}</span>
          <div class="sw-playground__actions">
            <button
              class="sw-playground__action-btn"
              :title="`${collapsedCategories.size > 0 ? 'Collapse' : 'Expand'} all categories`"
              @click="toggleAllCategories"
            >
              <SwIcon
                name="chevron-down"
                :size="15"
                class="sw-playground__category-chevron"
                :class="{
                  'sw-playground__category-chevron--collapsed': collapsedCategories.size > 0,
                }"
              />
            </button>
            <button
              class="sw-playground__action-btn"
              title="Reset to defaults"
              @click="resetToDefaults"
            >
              <SwIcon name="rotate-ccw" :size="13" />
            </button>
          </div>
        </div>

        <!-- Component tabs -->
        <div v-if="hasComponents" class="sw-playground__component-tabs">
          <button
            v-for="group in groupedByComponent"
            :key="group.key"
            :class="[
              'sw-playground__component-tab',
              { 'sw-playground__component-tab--active': selectedComponent === group.key },
            ]"
            @click="selectedComponent = group.key"
          >
            {{ group.label }}
          </button>
        </div>

        <div class="sw-playground__controls-list">
          <!-- Component-grouped mode: show only active component's categories -->
          <template v-if="hasComponents">
            <template
              v-for="[cat, catProps] in activeComponentGroup?.categories ?? []"
              :key="`${selectedComponent}:${cat}`"
            >
              <button
                v-if="cat"
                class="sw-playground__category-header"
                @click="toggleCategory(`${selectedComponent}:${cat}`)"
              >
                {{ CATEGORY_LABELS[cat] }}
                <SwIcon
                  name="chevron-down"
                  :size="11"
                  class="sw-playground__category-chevron"
                  :class="{
                    'sw-playground__category-chevron--collapsed': collapsedCategories.has(
                      `${selectedComponent}:${cat}`,
                    ),
                  }"
                />
              </button>
              <div
                v-for="p in catProps"
                v-show="!cat || !collapsedCategories.has(`${selectedComponent}:${cat}`)"
                :key="p.name"
                class="sw-playground__prop"
                :class="{ 'sw-playground__prop--none': p.control === 'none' }"
              >
                <div class="sw-playground__prop-header">
                  <span class="sw-playground__prop-label">{{ getLabel(p) }}</span>
                  <span v-if="p.required" class="sw-playground__required">*</span>
                  <span v-if="p.isSlotContent" class="sw-playground__slot-badge">slot</span>
                  <SwTooltip v-if="getTooltip(p)" placement="right" :open-delay="200">
                    <button class="sw-playground__info-btn">
                      <SwIcon name="info" :size="13" />
                    </button>
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <template #content><span v-html="getTooltip(p)" /></template>
                  </SwTooltip>
                </div>
                <div v-if="p.control !== 'none'" class="sw-playground__prop-control">
                  <SwInputText
                    v-if="p.control === 'text'"
                    v-model="values[p.name]"
                    size="sm"
                    :placeholder="p.default !== undefined ? String(p.default) : ''"
                  />
                  <SwSelect
                    v-else-if="p.control === 'select'"
                    v-model="values[p.name]"
                    size="sm"
                    :options="(p.options ?? []).map((o) => ({ value: o, label: o }))"
                  />
                  <SwSwitch v-else-if="p.control === 'toggle'" v-model="values[p.name]" />
                  <SwIconInput v-else-if="p.control === 'icon'" v-model="values[p.name]" />
                  <div v-else-if="p.control === 'preset'" class="sw-playground__presets">
                    <button
                      v-for="(preset, i) in p.presets"
                      :key="i"
                      :class="[
                        'sw-playground__preset-chip',
                        { 'sw-playground__preset-chip--active': selectedPresetIndex[p.name] === i },
                      ]"
                      @click="selectPreset(p, i)"
                    >
                      {{ preset.label }}
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </template>

          <!-- Flat mode -->
          <template v-else>
            <template v-for="[cat, catProps] in grouped" :key="cat">
              <button
                v-if="cat"
                class="sw-playground__category-header"
                @click="toggleCategory(cat)"
              >
                {{ CATEGORY_LABELS[cat] }}
                <SwIcon
                  name="chevron-down"
                  :size="11"
                  class="sw-playground__category-chevron"
                  :class="{
                    'sw-playground__category-chevron--collapsed': collapsedCategories.has(cat),
                  }"
                />
              </button>
              <div
                v-for="p in catProps"
                v-show="!cat || !collapsedCategories.has(cat)"
                :key="p.name"
                class="sw-playground__prop"
                :class="{ 'sw-playground__prop--none': p.control === 'none' }"
              >
                <div class="sw-playground__prop-header">
                  <span class="sw-playground__prop-label">{{ getLabel(p) }}</span>
                  <span v-if="p.required" class="sw-playground__required">*</span>
                  <span v-if="p.isSlotContent" class="sw-playground__slot-badge">slot</span>
                  <SwTooltip v-if="getTooltip(p)" placement="right" :open-delay="200">
                    <button class="sw-playground__info-btn">
                      <SwIcon name="info" :size="13" />
                    </button>
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <template #content><span v-html="getTooltip(p)" /></template>
                  </SwTooltip>
                </div>
                <div v-if="p.control !== 'none'" class="sw-playground__prop-control">
                  <SwInputText
                    v-if="p.control === 'text'"
                    v-model="values[p.name]"
                    size="sm"
                    :placeholder="p.default !== undefined ? String(p.default) : ''"
                  />
                  <SwSelect
                    v-else-if="p.control === 'select'"
                    v-model="values[p.name]"
                    size="sm"
                    :options="(p.options ?? []).map((o) => ({ value: o, label: o }))"
                  />
                  <SwSwitch v-else-if="p.control === 'toggle'" v-model="values[p.name]" />
                  <SwIconInput v-else-if="p.control === 'icon'" v-model="values[p.name]" />
                  <div v-else-if="p.control === 'preset'" class="sw-playground__presets">
                    <button
                      v-for="(preset, i) in p.presets"
                      :key="i"
                      :class="[
                        'sw-playground__preset-chip',
                        { 'sw-playground__preset-chip--active': selectedPresetIndex[p.name] === i },
                      ]"
                      @click="selectPreset(p, i)"
                    >
                      {{ preset.label }}
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </template>
        </div>
      </div>

      <!-- Preview panel -->
      <div class="sw-playground__preview" :class="previewClass">
        <slot :values="values" />
      </div>
    </div>

    <!-- Code section -->
    <div class="sw-playground__code">
      <div class="sw-playground__code-header">
        <div class="sw-playground__code-label">
          <SwIcon name="code-2" :size="13" />
          Code
        </div>
        <div class="sw-playground__code-actions">
          <button
            :class="['sw-playground__copy-btn', { 'sw-playground__copy-btn--done': copied }]"
            @click="copyCode()"
          >
            <SwIcon :name="copied ? 'check' : 'copy'" :size="13" />
            {{ copied ? 'Copied!' : 'Copy' }}
          </button>
        </div>
      </div>
      <SwCodeBlock :code="resolvedCode" :language="language" :show-toolbar="false" />
    </div>
  </div>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-playground {
  @apply rounded-2xl border border-border shadow-sm;
}

/* ---- Body ---- */
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
         lg:border-b-0 lg:border-r lg:w-64 lg:shrink-0
         lg:rounded-t-none lg:rounded-tl-2xl;
}

.sw-playground__body--stacked .sw-playground__controls {
  @apply lg:border-r-0 lg:border-b lg:w-auto lg:rounded-tl-2xl lg:rounded-tr-2xl;
}

.sw-playground__controls-header {
  @apply flex items-center gap-2 px-4 py-3
         text-xs font-semibold tracking-wider uppercase
         text-text-subtle border-b border-border select-none;
}

.sw-playground__badge {
  @apply inline-flex items-center justify-center
         rounded-full text-xs font-semibold px-1.5 min-w-5 h-5
         bg-surface-hover text-text-muted;
}

.sw-playground__actions {
  @apply flex ml-auto;
}

.sw-playground__action-btn {
  @apply flex items-center justify-center w-6 h-6 rounded-md
         text-text-subtle hover:text-text hover:bg-surface-hover
         cursor-pointer transition-colors;
}

/* ---- Component tabs ---- */
.sw-playground__component-tabs {
  @apply flex border-b border-border;
}

.sw-playground__component-tab {
  @apply px-4 py-2.5 text-[11px] font-mono font-semibold text-text-subtle
         border-b-2 border-transparent -mb-px
         cursor-pointer select-none transition-colors duration-150;
}

.sw-playground__component-tab:hover {
  @apply text-text;
}

.sw-playground__component-tab--active {
  @apply text-primary border-primary;
}

/* ---- Category header ---- */
.sw-playground__category-header {
  @apply w-full flex items-center justify-between
         px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider
         text-text-subtle bg-surface border-b border-border select-none
         cursor-pointer hover:text-text transition-colors;
}

.sw-playground__category-chevron {
  @apply transition-transform duration-150;
}

.sw-playground__category-chevron--collapsed {
  @apply -rotate-90;
}

/* ---- Prop rows (vertical layout) ---- */
.sw-playground__prop {
  @apply flex flex-col gap-2 px-4 py-3 border-b border-border last:border-b-0;
}

.sw-playground__prop--none {
  @apply py-2.5;
}

.sw-playground__prop-header {
  @apply flex items-center gap-1.5 min-h-4;
}

.sw-playground__prop-label {
  @apply font-mono text-xs font-medium text-text;
}

.sw-playground__required {
  @apply text-xs font-semibold leading-none text-danger select-none;
}

.sw-playground__slot-badge {
  @apply text-[10px] font-semibold px-1.5 py-px rounded-full leading-none
         text-primary select-none;
  background: color-mix(in srgb, var(--color-primary) 10%, transparent);
}

.sw-playground__info-btn {
  @apply flex items-center text-text-subtle hover:text-text transition-colors cursor-default ml-auto;
}

.sw-playground__prop-control {
  @apply w-full;
}

/* ---- Preset chips ---- */
.sw-playground__presets {
  @apply flex flex-wrap gap-1.5;
}

.sw-playground__preset-chip {
  @apply px-2.5 py-1 rounded-md text-xs font-medium
         border border-border bg-surface text-text-muted
         hover:border-border-strong hover:text-text
         cursor-pointer transition-colors select-none;
}

.sw-playground__preset-chip--active {
  @apply text-primary border-primary;
  background: color-mix(in srgb, var(--color-primary) 8%, transparent);
}

/* ---- Controls stand out against subtle panel bg ---- */
.sw-playground__controls :deep(.sw-input__input),
.sw-playground__controls :deep(.sw-select__trigger),
.sw-playground__controls :deep(.sw-switch__control[data-state='unchecked']) {
  @apply bg-surface;
}

/* ---- Preview panel ---- */
.sw-playground__preview {
  @apply flex flex-wrap items-center justify-center gap-3
         p-10 bg-surface flex-1 lg:rounded-tr-2xl min-h-40;
  background-image: radial-gradient(var(--border) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* ---- Code section ---- */
.sw-playground__code {
  @apply border-t border-border rounded-b-2xl overflow-hidden;
}

.sw-playground__code-header {
  @apply flex items-center gap-3 px-4 py-2.5
         bg-surface-subtle border-b border-border;
}

.sw-playground__code-label {
  @apply flex items-center gap-2
         text-xs font-semibold tracking-wider uppercase
         text-text-subtle select-none;
}

.sw-playground__code-actions {
  @apply ml-auto flex items-center gap-3;
}

.sw-playground__copy-btn {
  @apply flex items-center gap-1.5 text-xs text-text-subtle
         hover:text-text cursor-pointer transition-colors select-none;
}

.sw-playground__copy-btn--done {
  @apply text-success;
}
</style>
