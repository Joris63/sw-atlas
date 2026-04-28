import { z } from 'zod';

export const string = {
  required(message = 'This field is required') {
    return z.string().min(1, message);
  },

  minLength(min: number, message?: string) {
    return z.string().min(min, message ?? `Must be at least ${min} characters`);
  },

  maxLength(max: number, message?: string) {
    return z.string().max(max, message ?? `Must be at most ${max} characters`);
  },

  email(message = 'Must be a valid email address') {
    return z.email(message);
  },

  url(message = 'Must be a valid URL') {
    return z.url(message);
  },

  pattern(regex: RegExp, message: string) {
    return z.string().regex(regex, message);
  },
};

export const number = {
  min(min: number, message?: string) {
    return z.number().min(min, message ?? `Must be at least ${min}`);
  },

  max(max: number, message?: string) {
    return z.number().max(max, message ?? `Must be at most ${max}`);
  },

  between(minVal: number, maxVal: number, messages?: { min?: string; max?: string }) {
    return z
      .number()
      .min(minVal, messages?.min ?? `Must be at least ${minVal}`)
      .max(maxVal, messages?.max ?? `Must be at most ${maxVal}`);
  },

  integer(message = 'Must be a whole number') {
    return z.number().int(message);
  },

  positive(message = 'Must be a positive number') {
    return z.number().positive(message);
  },
};
