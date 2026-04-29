import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';

/* COMPOSABLES */
import UseValidationPage from '@/pages/styleguide/composables/UseValidationPage.vue';
import UseDarkModePage from '@/pages/styleguide/composables/UseDarkModePage.vue';

/* DESIGN */
import ColorsPage from '@/pages/styleguide/design/ColorsPage.vue';
import TypographyPage from '@/pages/styleguide/design/TypographyPage.vue';
import SpacingPage from '@/pages/styleguide/design/SpacingPage.vue';
import ShadowsPage from '@/pages/styleguide/design/ShadowsPage.vue';
import BordersPage from '@/pages/styleguide/design/BordersPage.vue';

/* BUTTONS */
import SwButtonPage from '@/pages/styleguide/components/buttons/SwButtonPage.vue';
import SwIconButtonPage from '@/pages/styleguide/components/buttons/SwIconButtonPage.vue';
import SwSelectButtonPage from '@/pages/styleguide/components/buttons/SwSelectButtonPage.vue';

/* TYPOGRAPHY */
import SwHeadingPage from '@/pages/styleguide/components/typography/SwHeadingPage.vue';
import SwTextPage from '@/pages/styleguide/components/typography/SwTextPage.vue';
import SwLabelPage from '@/pages/styleguide/components/typography/SwLabelPage.vue';
import SwCodePage from '@/pages/styleguide/components/typography/SwCodePage.vue';

/* FORMS */
import SwInputTextPage from '@/pages/styleguide/components/forms/SwInputTextPage.vue';
import SwSwitchPage from '@/pages/styleguide/components/forms/SwSwitchPage.vue';
import SwCheckboxPage from '@/pages/styleguide/components/forms/SwCheckboxPage.vue';
import SwRadioPage from '@/pages/styleguide/components/forms/SwRadioPage.vue';
import SwSelectPage from '@/pages/styleguide/components/forms/SwSelectPage.vue';
import SwTextareaPage from '@/pages/styleguide/components/forms/SwTextareaPage.vue';
import SwNumberInputPage from '@/pages/styleguide/components/forms/SwNumberInputPage.vue';

/* DISPLAY */
import SwBadgePage from '@/pages/styleguide/components/display/SwBadgePage.vue';
import SwTabsPage from '@/pages/styleguide/components/display/SwTabsPage.vue';
import SwIconPage from '@/pages/styleguide/components/display/SwIconPage.vue';
import SwPaginationPage from '@/pages/styleguide/components/display/SwPaginationPage.vue';

/* OVERLAYS */
import SwTooltipPage from '@/pages/styleguide/components/overlays/SwTooltipPage.vue';
import SwDrawerPage from '@/pages/styleguide/components/overlays/SwDrawerPage.vue';
import SwDialogPage from '@/pages/styleguide/components/overlays/SwDialogPage.vue';

/* FEEDBACK */
import SwToastPage from '@/pages/styleguide/components/feedback/SwToastPage.vue';

type Crumb = { label: string; icon?: string; to?: string };

function sgCrumbs(...labels: string[]): Crumb[] {
  return [
    { label: 'Home', icon: 'house', to: '/' },
    { label: 'Styleguide' },
    ...labels.map((l) => ({ label: l })),
  ];
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
      meta: { breadcrumbs: [{ label: 'Home', icon: 'house', to: '/' }] },
    },

    // Design tokens
    {
      path: '/styleguide/tokens/colors',
      component: ColorsPage,
      meta: { breadcrumbs: sgCrumbs('Colors') },
    },
    {
      path: '/styleguide/tokens/typography',
      component: TypographyPage,
      meta: { breadcrumbs: sgCrumbs('Typography') },
    },
    {
      path: '/styleguide/tokens/spacing',
      component: SpacingPage,
      meta: { breadcrumbs: sgCrumbs('Spacing') },
    },
    {
      path: '/styleguide/tokens/shadows',
      component: ShadowsPage,
      meta: { breadcrumbs: sgCrumbs('Shadows') },
    },
    {
      path: '/styleguide/tokens/borders',
      component: BordersPage,
      meta: { breadcrumbs: sgCrumbs('Borders') },
    },

    // Buttons
    {
      path: '/styleguide/components/button',
      component: SwButtonPage,
      meta: { breadcrumbs: sgCrumbs('SwButton') },
    },
    {
      path: '/styleguide/components/icon-button',
      component: SwIconButtonPage,
      meta: { breadcrumbs: sgCrumbs('SwIconButton') },
    },
    {
      path: '/styleguide/components/select-button',
      component: SwSelectButtonPage,
      meta: { breadcrumbs: sgCrumbs('SwSelectButton') },
    },

    // Typography
    {
      path: '/styleguide/components/heading',
      component: SwHeadingPage,
      meta: { breadcrumbs: sgCrumbs('SwHeading') },
    },
    {
      path: '/styleguide/components/text',
      component: SwTextPage,
      meta: { breadcrumbs: sgCrumbs('SwText') },
    },
    {
      path: '/styleguide/components/label',
      component: SwLabelPage,
      meta: { breadcrumbs: sgCrumbs('SwLabel') },
    },
    {
      path: '/styleguide/components/code',
      component: SwCodePage,
      meta: { breadcrumbs: sgCrumbs('SwCode') },
    },

    // Forms
    {
      path: '/styleguide/components/input',
      component: SwInputTextPage,
      meta: { breadcrumbs: sgCrumbs('SwInputText') },
    },
    {
      path: '/styleguide/components/switch',
      component: SwSwitchPage,
      meta: { breadcrumbs: sgCrumbs('SwSwitch') },
    },
    {
      path: '/styleguide/components/checkbox',
      component: SwCheckboxPage,
      meta: { breadcrumbs: sgCrumbs('SwCheckbox') },
    },
    {
      path: '/styleguide/components/radio',
      component: SwRadioPage,
      meta: { breadcrumbs: sgCrumbs('SwRadio') },
    },
    {
      path: '/styleguide/components/select',
      component: SwSelectPage,
      meta: { breadcrumbs: sgCrumbs('SwSelect') },
    },
    {
      path: '/styleguide/components/textarea',
      component: SwTextareaPage,
      meta: { breadcrumbs: sgCrumbs('SwTextarea') },
    },
    {
      path: '/styleguide/components/number-input',
      component: SwNumberInputPage,
      meta: { breadcrumbs: sgCrumbs('SwNumberInput') },
    },

    // Display
    {
      path: '/styleguide/components/badge',
      component: SwBadgePage,
      meta: { breadcrumbs: sgCrumbs('SwBadge') },
    },
    {
      path: '/styleguide/components/tabs',
      component: SwTabsPage,
      meta: { breadcrumbs: sgCrumbs('SwTabs') },
    },
    {
      path: '/styleguide/components/icon',
      component: SwIconPage,
      meta: { breadcrumbs: sgCrumbs('SwIcon') },
    },
    {
      path: '/styleguide/components/pagination',
      component: SwPaginationPage,
      meta: { breadcrumbs: sgCrumbs('SwPagination') },
    },

    // Overlays
    {
      path: '/styleguide/components/tooltip',
      component: SwTooltipPage,
      meta: { breadcrumbs: sgCrumbs('SwTooltip') },
    },
    {
      path: '/styleguide/components/drawer',
      component: SwDrawerPage,
      meta: { breadcrumbs: sgCrumbs('SwDrawer') },
    },
    {
      path: '/styleguide/components/dialog',
      component: SwDialogPage,
      meta: { breadcrumbs: sgCrumbs('SwDialog') },
    },

    // Feedback
    {
      path: '/styleguide/components/toast',
      component: SwToastPage,
      meta: { breadcrumbs: sgCrumbs('SwToast') },
    },

    // Composables
    {
      path: '/styleguide/composables/use-validation',
      component: UseValidationPage,
      meta: { breadcrumbs: sgCrumbs('useValidation') },
    },
    {
      path: '/styleguide/composables/use-dark-mode',
      component: UseDarkModePage,
      meta: { breadcrumbs: sgCrumbs('useDarkMode') },
    },
  ],
});

export default router;
