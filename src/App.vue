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
        <SwNavItem icon="palette" label="Colors" to="/styleguide/tokens/colors" />
        <SwNavItem icon="type" label="Typography" to="/styleguide/tokens/typography" />
        <SwNavItem icon="ruler" label="Spacing" to="/styleguide/tokens/spacing" />
        <SwNavItem icon="layers" label="Shadows" to="/styleguide/tokens/shadows" />
        <SwNavItem icon="square-dashed" label="Borders" to="/styleguide/tokens/borders" />
      </SwNavGroup>

      <SwNavGroup label="Components">
        <SwNavItem icon="mouse-pointer" label="Buttons">
          <SwNavItem label="SwButton" to="/styleguide/components/button" />
          <SwNavItem label="SwIconButton" to="/styleguide/components/icon-button" />
          <SwNavItem label="SwSelectButton" to="/styleguide/components/select-button" />
        </SwNavItem>

        <SwNavItem icon="type" label="Typography">
          <SwNavItem label="SwHeading" to="/styleguide/components/heading" />
          <SwNavItem label="SwText" to="/styleguide/components/text" />
          <SwNavItem label="SwLabel" to="/styleguide/components/label" />
          <SwNavItem label="SwCode" to="/styleguide/components/code" />
        </SwNavItem>

        <SwNavItem icon="text-cursor-input" label="Forms">
          <SwNavItem label="SwInputText" to="/styleguide/components/input" />
          <SwNavItem label="SwTextarea" to="/styleguide/components/textarea" />
          <SwNavItem label="SwSwitch" to="/styleguide/components/switch" />
          <SwNavItem label="SwCheckbox" to="/styleguide/components/checkbox" />
          <SwNavItem label="SwRadio" to="/styleguide/components/radio" />
          <SwNavItem label="SwSelect" to="/styleguide/components/select" />
          <SwNavItem label="SwNumberInput" to="/styleguide/components/number-input" />
        </SwNavItem>

        <SwNavItem icon="layout-panel-top" label="Display">
          <SwNavItem label="SwIcon" to="/styleguide/components/icon" />
          <SwNavItem label="SwBadge" to="/styleguide/components/badge" />
          <SwNavItem label="SwTabs" to="/styleguide/components/tabs" />
          <SwNavItem label="SwPagination" to="/styleguide/components/pagination" />
        </SwNavItem>

        <SwNavItem icon="panels-top-left" label="Overlays">
          <SwNavItem label="SwTooltip" to="/styleguide/components/tooltip" />
          <SwNavItem label="SwDrawer" to="/styleguide/components/drawer" />
          <SwNavItem label="SwDialog" to="/styleguide/components/dialog" />
        </SwNavItem>

        <SwNavItem icon="bell" label="Feedback">
          <SwNavItem label="SwToast" to="/styleguide/components/toast" />
          <SwNavItem label="SwBanner" to="/styleguide/components/banner" />
        </SwNavItem>
      </SwNavGroup>

      <SwNavGroup label="Composables">
        <SwNavItem
          label="useValidation"
          icon="badge-check"
          to="/styleguide/composables/use-validation"
        />
        <SwNavItem label="useDarkMode" icon="sun-moon" to="/styleguide/composables/use-dark-mode" />
      </SwNavGroup>
    </template>

    <RouterView />
  </SwAppLayout>
</template>
