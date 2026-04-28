<script setup lang="ts">
import { ref } from 'vue';
import { z } from 'zod';
import SwPage from '@/components/layout/SwPage.vue';
import SwPropsTable from '@/components/ui/docs/SwPropsTable.vue';
import SwHeading from '@/components/ui/typography/SwHeading.vue';
import SwText from '@/components/ui/typography/SwText.vue';
import SwInput from '@/components/ui/forms/SwInput.vue';
import SwButton from '@/components/ui/buttons/SwButton.vue';
import SwCodeBlock from '@/components/ui/docs/SwCodeBlock.vue';
import { useValidation } from '@/composables/useValidation';
import { string as sv } from '@/validators/validators';
import ValidationNestedDemo from './demos/ValidationNestedDemo.vue';

const optionsRows = [
  {
    name: 'name',
    type: 'string',
    description:
      'Identifier used to register this instance with a parent useValidation context. Required for nested validation — omit for standalone forms.',
  },
  {
    name: 'schema',
    type: 'ZodType<T>',
    description: 'Zod schema to validate against. If omitted, validate() always resolves true.',
  },
  {
    name: 'data',
    type: '() => T',
    description:
      'A function returning the current value to validate. Called at validation time, not at setup time.',
  },
];

const returnsRows = [
  {
    name: 'errors',
    type: 'Ref<string[]>',
    description: 'Flat list of error messages from the last validate() call. Empty when valid.',
  },
  {
    name: 'isValid',
    type: 'Ref<boolean>',
    description: 'True when the last validation passed. Starts as true before any validation.',
  },
  {
    name: 'isDirty',
    type: 'Ref<boolean>',
    description: 'Becomes true after the first validate() call. Use to suppress errors on pristine fields.',
  },
  {
    name: 'validate',
    type: '() => Promise<boolean>',
    description: 'Validates data against the schema, updates errors and isValid, marks isDirty.',
  },
  {
    name: 'validateAll',
    type: '() => Promise<boolean>',
    description:
      'Validates this instance and all registered child instances. Typically called from a form submit handler on the parent.',
  },
  {
    name: 'reset',
    type: '() => void',
    description:
      'Clears errors, resets isValid to true and isDirty to false. Propagates to all registered children.',
  },
];

// Basic demo
const username = ref('');
const usernameSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username may be at most 20 characters'),
});
const { errors, isValid, isDirty, validate, reset } = useValidation({
  schema: usernameSchema,
  data: () => ({ username: username.value }),
});

function handleReset() {
  username.value = '';
  reset();
}

const basicCode = `import { ref } from 'vue';
import { z } from 'zod';
import { useValidation } from '@/composables/useValidation';

const username = ref('');
const schema = z.object({
  username: z.string().min(3, 'Must be at least 3 characters'),
});

const { errors, isValid, isDirty, validate, reset } = useValidation({
  schema,
  data: () => ({ username: username.value }),
});`;

// Validator demo
const email = ref('');
const emailSchema = z.object({ email: sv.email('Must be a valid email address') });
const { errors: emailErrors, validate: validateEmail, reset: resetEmail } = useValidation({
  schema: emailSchema,
  data: () => ({ email: email.value }),
});
function handleEmailReset() { email.value = ''; resetEmail(); }

// Validator reference rows
const stringValidatorRows = [
  { name: 'string.required(message?)', type: 'ZodString', default: 'This field is required', description: 'Fails on empty string.' },
  { name: 'string.minLength(n, message?)', type: 'ZodString', default: 'Must be at least n characters', description: 'Minimum character count.' },
  { name: 'string.maxLength(n, message?)', type: 'ZodString', default: 'Must be at most n characters', description: 'Maximum character count.' },
  { name: 'string.email(message?)', type: 'ZodString', default: 'Must be a valid email address', description: 'Email format check.' },
  { name: 'string.url(message?)', type: 'ZodString', default: 'Must be a valid URL', description: 'URL format check.' },
  { name: 'string.pattern(regex, message)', type: 'ZodString', default: '—', description: 'Custom regular expression.' },
];

const numberValidatorRows = [
  { name: 'number.min(n, message?)', type: 'ZodNumber', default: 'Must be at least n', description: 'Minimum numeric value.' },
  { name: 'number.max(n, message?)', type: 'ZodNumber', default: 'Must be at most n', description: 'Maximum numeric value.' },
  { name: 'number.between(min, max, messages?)', type: 'ZodNumber', default: 'Must be at least / at most n', description: 'Inclusive range check. Pass { min, max } to override each message individually.' },
  { name: 'number.integer(message?)', type: 'ZodNumber', default: 'Must be a whole number', description: 'Rejects decimals.' },
  { name: 'number.positive(message?)', type: 'ZodNumber', default: 'Must be a positive number', description: 'Must be greater than zero.' },
];

const validatorBasicCode = `import { string, number } from '@sw-atlas/validators';

const schema = z.object({
  email: string.email(),
  username: string.required(),
  age: number.between(0, 120),
});`;

const validatorChainCode = `import { string, number } from '@sw-atlas/validators';

// Validators return ZodString / ZodNumber, so Zod's fluent API chains naturally
const schema = z.object({
  // required AND max length
  name: string.required('Name is required').max(50, 'Too long'),

  // email with a max length — z.email() returns ZodString, so Zod methods still chain
  email: string.email('Invalid email').max(100, 'Too long'),

  // numeric range with individual overrides
  price: number.min(0, 'Cannot be negative').max(9999, 'Too high'),
});`;

const validatorI18nCode = `import { string } from '@sw-atlas/validators';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const schema = z.object({
  email: string.email(t('validation.email')),
  name:  string.required(t('validation.required')).max(50, t('validation.max_length', { n: 50 })),
});`;

const nestedCode = `// Parent component
const { validateAll, isValid, reset } = useValidation();

// Child component — registers with the nearest parent on mount
useValidation({
  name: 'firstName',  // name is required to register with a parent
  schema: firstNameSchema,
  data: () => ({ value: firstName.value }),
});

// One call validates the entire tree
await validateAll();`;
</script>

<template>
  <SwPage
    title="useValidation"
    description="Schema-based form validation using Zod. Supports nested forms through Vue's provide/inject — child instances register with their nearest parent automatically."
  >
    <!-- API Reference -->
    <section class="sw-use-validation-page__section">
      <SwHeading :level="2" size="xl">API</SwHeading>
      <SwText color="muted">
        Pass an optional options object. All three options work together: schema defines the shape,
        data provides the current value, and name links the instance to a parent.
      </SwText>
      <div class="sw-use-validation-page__tables">
        <SwPropsTable label="Options" icon="settings-2" :rows="optionsRows" />
        <SwPropsTable label="Returns" icon="arrow-right-from-line" :rows="returnsRows" />
      </div>
    </section>

    <!-- Basic Usage Demo -->
    <section class="sw-use-validation-page__section">
      <SwHeading :level="2" size="xl">Basic usage</SwHeading>
      <SwText color="muted">
        Provide a schema and a data function. Call validate() manually — errors and isValid update
        reactively. isDirty lets you know whether validation has run yet.
      </SwText>

      <div class="sw-use-validation-page__demo-card">
        <div class="sw-use-validation-page__demo-card-body">
          <div class="sw-use-validation-page__demo-card-form">
            <SwInput
              v-model="username"
              label="Username"
              placeholder="Enter a username"
              :error="errors[0]"
            />
            <div class="sw-use-validation-page__demo-card-actions">
              <SwButton label="Validate" size="sm" @click="validate" />
              <SwButton label="Reset" size="sm" variant="outline" @click="handleReset" />
            </div>
          </div>

          <div class="sw-use-validation-page__demo-card-state">
            <div class="sw-use-validation-page__state-row">
              <code class="sw-use-validation-page__state-key">isDirty</code>
              <span
                :class="[
                  'sw-use-validation-page__state-badge',
                  isDirty
                    ? 'sw-use-validation-page__state-badge--active'
                    : 'sw-use-validation-page__state-badge--inactive',
                ]"
              >
                {{ String(isDirty) }}
              </span>
            </div>
            <div class="sw-use-validation-page__state-row">
              <code class="sw-use-validation-page__state-key">isValid</code>
              <span
                :class="[
                  'sw-use-validation-page__state-badge',
                  isValid
                    ? 'sw-use-validation-page__state-badge--valid'
                    : 'sw-use-validation-page__state-badge--invalid',
                ]"
              >
                {{ String(isValid) }}
              </span>
            </div>
            <div class="sw-use-validation-page__state-row sw-use-validation-page__state-row--top">
              <code class="sw-use-validation-page__state-key">errors</code>
              <div v-if="errors.length === 0" class="sw-use-validation-page__state-empty">[ ]</div>
              <ul v-else class="sw-use-validation-page__state-errors">
                <li v-for="e in errors" :key="e" class="sw-use-validation-page__state-error">
                  {{ e }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <SwCodeBlock :code="basicCode" language="ts" :show-toolbar="false" />
    </section>

    <!-- Nested Validation Demo -->
    <section class="sw-use-validation-page__section">
      <SwHeading :level="2" size="xl">Nested validation</SwHeading>
      <SwText color="muted">
        Each child instance registers with the nearest ancestor validation context on mount and
        unregisters on unmount. Calling validateAll() on the parent cascades through the entire
        tree. reset() propagates downward too.
      </SwText>

      <div class="sw-use-validation-page__demo-card">
        <div
          class="sw-use-validation-page__demo-card-body sw-use-validation-page__demo-card-body--full"
        >
          <div class="sw-use-validation-page__demo-card-form">
            <ValidationNestedDemo />
          </div>
        </div>
      </div>

      <SwCodeBlock :code="nestedCode" language="ts" :show-toolbar="false" />
    </section>

    <!-- Validators -->
    <section class="sw-use-validation-page__section">
      <SwHeading :level="2" size="xl">Validators</SwHeading>
      <SwText color="muted">
        Built-in validator factories cover the most common cases. Each returns a Zod type, so you
        can keep chaining Zod methods on the result. Pass an optional message to override the
        default — or pass a translated string from your i18n setup.
      </SwText>

      <div class="sw-use-validation-page__tables">
        <SwPropsTable label="String" icon="type" :rows="stringValidatorRows" />
        <SwPropsTable label="Number" icon="hash" :rows="numberValidatorRows" />
      </div>

      <!-- Live demo -->
      <div class="sw-use-validation-page__demo-card">
        <div class="sw-use-validation-page__demo-card-body">
          <div class="sw-use-validation-page__demo-card-form">
            <SwInput
              v-model="email"
              label="Email"
              placeholder="Enter an email address"
              :error="emailErrors[0]"
            />
            <div class="sw-use-validation-page__demo-card-actions">
              <SwButton label="Validate" size="sm" @click="validateEmail" />
              <SwButton label="Reset" size="sm" variant="outline" @click="handleEmailReset" />
            </div>
          </div>
          <div class="sw-use-validation-page__demo-card-state">
            <div class="sw-use-validation-page__state-row sw-use-validation-page__state-row--top">
              <code class="sw-use-validation-page__state-key">schema</code>
              <code class="sw-use-validation-page__state-schema">string.email()</code>
            </div>
            <div class="sw-use-validation-page__state-row sw-use-validation-page__state-row--top">
              <code class="sw-use-validation-page__state-key">errors</code>
              <div v-if="emailErrors.length === 0" class="sw-use-validation-page__state-empty">[ ]</div>
              <ul v-else class="sw-use-validation-page__state-errors">
                <li v-for="e in emailErrors" :key="e" class="sw-use-validation-page__state-error">{{ e }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <SwCodeBlock :code="validatorBasicCode" language="ts" :show-toolbar="false" />
      <SwCodeBlock :code="validatorChainCode" language="ts" :show-toolbar="false" />
      <SwCodeBlock :code="validatorI18nCode" language="ts" :show-toolbar="false" />
    </section>
  </SwPage>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-use-validation-page__section {
  @apply flex flex-col gap-4;
}

.sw-use-validation-page__tables {
  @apply flex flex-col gap-3;
}

/* Demo card */
.sw-use-validation-page__demo-card {
  @apply rounded-2xl border border-border overflow-hidden;
}

.sw-use-validation-page__demo-card-body {
  @apply grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border;
}

.sw-use-validation-page__demo-card-body--full {
  @apply lg:grid-cols-1;
}

.sw-use-validation-page__demo-card-form {
  @apply flex flex-col gap-4 p-6 bg-surface;
}

.sw-use-validation-page__demo-card-actions {
  @apply flex items-center gap-2;
}

/* State panel */
.sw-use-validation-page__demo-card-state {
  @apply flex flex-col gap-4 p-6 bg-surface-subtle;
}

.sw-use-validation-page__state-row {
  @apply flex items-center justify-between gap-3;
}

.sw-use-validation-page__state-row--top {
  @apply items-start;
}

.sw-use-validation-page__state-key {
  @apply text-xs font-mono font-medium text-text-subtle shrink-0;
}

.sw-use-validation-page__state-badge {
  @apply text-[11px] font-semibold px-2 py-0.5 rounded-full font-mono;
}

.sw-use-validation-page__state-badge--valid {
  @apply text-success;
  background: color-mix(in srgb, var(--color-success) 12%, transparent);
}

.sw-use-validation-page__state-badge--invalid {
  @apply text-danger;
  background: color-mix(in srgb, var(--color-danger) 12%, transparent);
}

.sw-use-validation-page__state-badge--active {
  @apply text-primary;
  background: color-mix(in srgb, var(--color-primary) 10%, transparent);
}

.sw-use-validation-page__state-badge--inactive {
  @apply text-text-muted bg-surface-hover;
}

.sw-use-validation-page__state-schema {
  @apply text-xs font-mono text-primary;
}

.sw-use-validation-page__state-empty {
  @apply text-xs font-mono text-text-muted;
}

.sw-use-validation-page__state-errors {
  @apply flex flex-col gap-0.5 text-right;
}

.sw-use-validation-page__state-error {
  @apply text-xs text-danger;
}
</style>
