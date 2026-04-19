import { createToaster } from '@ark-ui/vue';

export const toaster = createToaster({
  placement: 'top-end',
  gap: 10,
  max: 6,
  offsets: '1.25rem',
});

interface ToastOptions {
  description?: string;
  duration?: number;
  action?: { label: string; onClick: () => void };
}

function show(
  type: 'success' | 'info' | 'warning' | 'error',
  title: string,
  options: ToastOptions = {},
) {
  return toaster.create({
    title,
    description: options.description,
    type,
    duration: options.duration,
    meta: options.action ? { action: options.action } : undefined,
  });
}

export function useToast() {
  return {
    success: (title: string, options?: ToastOptions) => show('success', title, options),
    info: (title: string, options?: ToastOptions) => show('info', title, options),
    warning: (title: string, options?: ToastOptions) => show('warning', title, options),
    error: (title: string, options?: ToastOptions) => show('error', title, options),
  };
}
