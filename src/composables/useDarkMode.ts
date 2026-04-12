import { ref, watchEffect } from 'vue'

const isDark = ref(
  localStorage.getItem('sw-theme') === 'dark' ||
  (!localStorage.getItem('sw-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches),
)

watchEffect(() => {
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('sw-theme', isDark.value ? 'dark' : 'light')
})

export function useDarkMode() {
  function toggle() {
    isDark.value = !isDark.value
  }

  return { isDark, toggle }
}
