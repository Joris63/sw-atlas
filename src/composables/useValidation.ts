import { provide, inject, ref, watchEffect, onMounted, onUnmounted, type Ref } from 'vue';
import type { ZodType, ZodError } from 'zod';
import { VALIDATION_KEY, type ValidationChild } from '@/types/validation';

export interface UseValidationOptions<T = unknown> {
  name?: string;
  schema?: ZodType<T>;
  data?: () => T;
}

export interface UseValidationReturn {
  errors: Ref<string[]>;
  isValid: Ref<boolean>;
  isDirty: Ref<boolean>;
  validate: () => Promise<boolean>;
  validateAll: () => Promise<boolean>;
  reset: () => void;
}

function flattenZodErrors(error: ZodError): string[] {
  return error.issues.map((issue) => issue.message);
}

export function useValidation<T = unknown>(
  options: UseValidationOptions<T> = {},
): UseValidationReturn {
  const { name, schema, data } = options;

  const errors = ref<string[]>([]);
  const isValid = ref(true);
  const isDirty = ref(false);

  // Inject from nearest ancestor before providing our own context
  const parent = inject(VALIDATION_KEY, null);

  // Provide our context for descendants
  const childrenMap = new Map<string, ValidationChild>();
  provide(VALIDATION_KEY, {
    register: (child) => childrenMap.set(child.name, child),
    unregister: (childName) => childrenMap.delete(childName),
  });

  // Continuously re-validate as data changes so isValid is always current.
  // errors only surface once isDirty is set (e.g. after first explicit validate()).
  watchEffect(() => {
    if (!schema || !data) {
      isValid.value = true;
      errors.value = [];
      return;
    }
    const result = schema.safeParse(data());
    isValid.value = result.success;
    errors.value = isDirty.value && !result.success ? flattenZodErrors(result.error) : [];
  });

  function validate(): Promise<boolean> {
    if (!schema || !data) {
      isDirty.value = true;
      return Promise.resolve(true);
    }

    isDirty.value = true;
    const result = schema.safeParse(data());
    isValid.value = result.success;
    errors.value = result.success ? [] : flattenZodErrors(result.error);
    return Promise.resolve(isValid.value);
  }

  async function validateAll(): Promise<boolean> {
    const selfValid = await validate();
    const childResults = await Promise.all([...childrenMap.values()].map((c) => c.validate()));
    const allValid = selfValid && childResults.every(Boolean);
    isValid.value = allValid;
    return allValid;
  }

  function getErrors(): string[] {
    return errors.value;
  }

  function reset(): void {
    errors.value = [];
    isValid.value = true;
    isDirty.value = false;
    childrenMap.forEach((c) => c.reset());
  }

  if (parent && name) {
    onMounted(() => {
      parent.register({ name, validate, getErrors, reset });
    });
    onUnmounted(() => {
      parent.unregister(name);
    });
  }

  return { errors, isValid, isDirty, validate, validateAll, reset };
}
