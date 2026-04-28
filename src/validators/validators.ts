import { z } from 'zod';

// ---- String ---------------------------------------------------------------

export function required(message = 'This field is required') {
  return z.string().min(1, message);
}

export function minLength(min: number, message?: string) {
  return z.string().min(min, message ?? `Must be at least ${min} characters`);
}

export function maxLength(max: number, message?: string) {
  return z.string().max(max, message ?? `Must be at most ${max} characters`);
}

export function email(message = 'Must be a valid email address') {
  return z.email(message);
}

export function url(message = 'Must be a valid URL') {
  return z.url(message);
}

export function pattern(regex: RegExp, message: string) {
  return z.string().regex(regex, message);
}

export function alpha(message = 'Must contain letters only') {
  return z.string().regex(/^[a-zA-Z]+$/, message);
}

export function alphanumeric(message = 'Must contain only letters and numbers') {
  return z.string().regex(/^[a-zA-Z0-9]+$/, message);
}

export function noSpecialChars(message = 'Special characters are not allowed') {
  return z.string().regex(/^[a-zA-Z0-9\s]+$/, message);
}

export function phone(message = 'Must be a valid phone number') {
  return z.string().regex(/^\+?[\d\s\-().]{7,20}$/, message);
}

export function slug(message = 'Must contain only lowercase letters, numbers, and hyphens') {
  return z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, message);
}

// ---- Number ---------------------------------------------------------------

export function minValue(min: number, message?: string) {
  return z.number().min(min, message ?? `Must be at least ${min}`);
}

export function maxValue(max: number, message?: string) {
  return z.number().max(max, message ?? `Must be at most ${max}`);
}

export function between(minVal: number, maxVal: number, messages?: { min?: string; max?: string }) {
  return z
    .number()
    .min(minVal, messages?.min ?? `Must be at least ${minVal}`)
    .max(maxVal, messages?.max ?? `Must be at most ${maxVal}`);
}

export function integer(message = 'Must be a whole number') {
  return z.number().int(message);
}

export function positive(message = 'Must be a positive number') {
  return z.number().positive(message);
}

export function negative(message = 'Must be a negative number') {
  return z.number().negative(message);
}

// ---- Array ----------------------------------------------------------------

export function nonempty(message = 'Must have at least one item') {
  return z.array(z.unknown()).min(1, message);
}

export function minItems(min: number, message?: string) {
  return z.array(z.unknown()).min(min, message ?? `Must have at least ${min} items`);
}

export function maxItems(max: number, message?: string) {
  return z.array(z.unknown()).max(max, message ?? `Must have at most ${max} items`);
}

// ---- Boolean --------------------------------------------------------------

export function accepted(message = 'Must be accepted') {
  return z.boolean().refine((v) => v === true, { message });
}
