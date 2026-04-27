import { provide, inject, ref, onMounted, onUnmounted, type Ref } from 'vue';
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

  function validate(): Promise<boolean> {
    if (!schema || !data) {
      return Promise.resolve(true);
    }

    isDirty.value = true;
    const result = schema.safeParse(data());

    if (result.success) {
      errors.value = [];
      isValid.value = true;
      return Promise.resolve(true);
    } else {
      errors.value = flattenZodErrors(result.error);
      isValid.value = false;
      return Promise.resolve(false);
    }
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
