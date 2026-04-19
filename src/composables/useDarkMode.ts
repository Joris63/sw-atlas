import { ref, watchEffect } from 'vue';

const storedTheme = localStorage.getItem('sw-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const isDark = ref(storedTheme === 'dark' || (storedTheme === null && prefersDark));

watchEffect(() => {
  document.documentElement.classList.toggle('dark', isDark.value);
  localStorage.setItem('sw-theme', isDark.value ? 'dark' : 'light');
});

export function useDarkMode() {
  function toggle() {
    isDark.value = !isDark.value;
  }

  return { isDark, toggle };
}
