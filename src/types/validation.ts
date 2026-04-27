import type { InjectionKey } from 'vue';

export interface ValidationChild {
  name: string;
  validate: () => Promise<boolean>;
  getErrors: () => string[];
  reset: () => void;
}

export interface ValidationParent {
  register: (child: ValidationChild) => void;
  unregister: (name: string) => void;
}

export const VALIDATION_KEY: InjectionKey<ValidationParent> = Symbol('sw-validation');
