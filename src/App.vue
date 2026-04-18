<script setup lang="ts">
import SwAppLayout from '@/components/layout/SwAppLayout.vue';
import SwNavItem from '@/components/navigation/SwNavItem.vue';
import SwNavGroup from '@/components/navigation/SwNavGroup.vue';
import SwDarkModeToggle from '@/components/ui/SwDarkModeToggle.vue';
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

      <SwNavGroup label="Components">
        <SwNavItem icon="mouse-pointer" label="Buttons">
          <SwNavItem label="Button" to="/styleguide/components/button" />
          <SwNavItem label="Icon Button" to="/styleguide/components/icon-button" />
          <SwNavItem label="Select Button" to="/styleguide/components/select-button" />
        </SwNavItem>
        <SwNavItem icon="type" label="Typography">
          <SwNavItem label="SwHeading" to="/styleguide/components/heading" />
          <SwNavItem label="SwText" to="/styleguide/components/text" />
          <SwNavItem label="SwLabel" to="/styleguide/components/label" />
          <SwNavItem label="SwCode" to="/styleguide/components/code" />
        </SwNavItem>
        <SwNavItem icon="text-cursor-input" label="Forms">
          <SwNavItem label="SwInput" to="/styleguide/components/input" />
          <SwNavItem label="SwTextarea" to="/styleguide/components/textarea" />
          <SwNavItem label="SwSwitch" to="/styleguide/components/switch" />
          <SwNavItem label="SwCheckbox" to="/styleguide/components/checkbox" />
          <SwNavItem label="SwRadio" to="/styleguide/components/radio" />
          <SwNavItem label="SwSelect" to="/styleguide/components/select" />
        </SwNavItem>
        <SwNavItem icon="tag" label="Display">
          <SwNavItem label="SwBadge" to="/styleguide/components/badge" />
          <SwNavItem label="SwTooltip" to="/styleguide/components/tooltip" />
        </SwNavItem>
        <SwNavItem icon="layout-panel-top" label="Navigation">
          <SwNavItem label="SwTabs" to="/styleguide/components/tabs" />
          <SwNavItem label="SwDrawer" to="/styleguide/components/drawer" />
        </SwNavItem>
      </SwNavGroup>
    </template>

    <RouterView />
  </SwAppLayout>
</template>
