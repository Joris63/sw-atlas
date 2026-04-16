<script setup lang="ts">
import SwAppLayout from '@/components/layout/SwAppLayout.vue'
import SwNavItem from '@/components/navigation/SwNavItem.vue'
import SwNavGroup from '@/components/navigation/SwNavGroup.vue'
import SwDarkModeToggle from '@/components/ui/SwDarkModeToggle.vue'
</script>

<template>
  <SwAppLayout logo="nl">
    <template #topbar-end>
      <SwDarkModeToggle />
    </template>

    <template #nav>
      <SwNavItem icon="house" label="Home" to="/" />

      <SwNavGroup label="Design Tokens">
        <SwNavItem icon="palette" label="Kleuren" to="/styleguide/tokens/colors" />
        <SwNavItem icon="type" label="Typografie" to="/styleguide/tokens/typography" />
        <SwNavItem icon="ruler" label="Spacing" to="/styleguide/tokens/spacing" />
        <SwNavItem icon="layers" label="Schaduwen" to="/styleguide/tokens/shadows" />
        <SwNavItem icon="square-dashed" label="Borders" to="/styleguide/tokens/borders" />
      </SwNavGroup>

      <SwNavGroup label="Componenten">
        <SwNavItem icon="mouse-pointer" label="Buttons">
          <SwNavItem label="Button" to="/styleguide/components/button" />
          <SwNavItem label="Icon Button" to="/styleguide/components/icon-button" />
        </SwNavItem>
        <SwNavItem icon="type" label="Typography">
          <SwNavItem label="SwHeading" to="/styleguide/components/heading" />
          <SwNavItem label="SwText" to="/styleguide/components/text" />
          <SwNavItem label="SwLabel" to="/styleguide/components/label" />
          <SwNavItem label="SwCode" to="/styleguide/components/code" />
        </SwNavItem>
        <SwNavItem icon="text-cursor-input" label="Forms">
          <SwNavItem label="SwInput" to="/styleguide/components/input" />
          <SwNavItem label="SwSwitch" to="/styleguide/components/switch" />
        </SwNavItem>
      </SwNavGroup>
    </template>

    <RouterView />
  </SwAppLayout>
</template>
