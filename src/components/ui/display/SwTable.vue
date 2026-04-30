<template>
  <div class="sw-table-wrapper">
    <div class="sw-table-scroll">
      <table class="sw-table">
        <thead v-if="$slots.head">
          <slot name="head" />
        </thead>
        <tbody>
          <slot />
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
@reference "@/styles/tailwind.css";

.sw-table-wrapper {
  @apply border border-border rounded-xl overflow-hidden w-full;
}

.sw-table-scroll {
  @apply overflow-x-auto;
}

.sw-table {
  @apply w-full border-collapse;
}
</style>
