import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts,tsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  // Upgraded from 'essential' — catches more Vue-specific mistakes
  ...pluginVue.configs['flat/recommended'],
  // Type-aware TypeScript rules (slower but catches real bugs)
  vueTsConfigs.recommendedTypeChecked,

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  skipFormatting,

  {
    name: 'app/rules',
    rules: {
      // ── General ──────────────────────────────────────────────────────────
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'object-shorthand': 'error',
      'prefer-template': 'error',

      // ── TypeScript ────────────────────────────────────────────────────────
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      // Async safety — these catch real runtime bugs
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      // Reduces `as unknown as X` hacks
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',

      // ── Vue ───────────────────────────────────────────────────────────────
      // Enforce PascalCase component usage in templates
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      // Enforce script-setup Composition API style across the codebase
      'vue/component-api-style': ['error', ['script-setup']],
      // Consistent macro ordering at the top of <script setup>
      'vue/define-macros-order': [
        'error',
        { order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'] },
      ],
      // Enforce type-based declarations for full TS integration
      'vue/define-emits-declaration': ['error', 'type-based'],
      'vue/define-props-declaration': ['error', 'type-based'],
      // Consistent block order: script → template → style
      'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
      // Typed refs prevent silent runtime type mismatches
      'vue/require-typed-ref': 'error',
      // Flag potential XSS vectors
      'vue/no-v-html': 'warn',
      'vue/no-unused-vars': 'error',
      // Prevent accidental reactive-data mutation in templates
      'vue/no-mutating-props': 'error',
    },
  },
)
