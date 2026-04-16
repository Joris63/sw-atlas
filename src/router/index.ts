import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'

/* DESIGN */
import ColorsPage from '@/pages/styleguide/design/ColorsPage.vue'
import TypographyPage from '@/pages/styleguide/design/TypographyPage.vue'
import SpacingPage from '@/pages/styleguide/design/SpacingPage.vue'
import ShadowsPage from '@/pages/styleguide/design/ShadowsPage.vue'
import BordersPage from '@/pages/styleguide/design/BordersPage.vue'

/* COMPONENTS */
/* BUTTONS */
import ButtonPage from '@/pages/styleguide/components/buttons/ButtonPage.vue'
import SwIconButtonPage from '@/pages/styleguide/components/buttons/SwIconButtonPage.vue'

/* TYPOGRAPHY */
import SwHeadingPage from '@/pages/styleguide/components/typography/SwHeadingPage.vue'
import SwTextPage from '@/pages/styleguide/components/typography/SwTextPage.vue'
import SwLabelPage from '@/pages/styleguide/components/typography/SwLabelPage.vue'
import SwCodePage from '@/pages/styleguide/components/typography/SwCodePage.vue'

type Crumb = { label: string; icon?: string; to?: string }

function sgCrumbs(...labels: string[]): Crumb[] {
  return [
    { label: 'Home', icon: 'house', to: '/' },
    { label: 'Styleguide' },
    ...labels.map((l) => ({ label: l })),
  ]
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
      meta: { breadcrumbs: sgCrumbs('Kleuren') },
    },
    {
      path: '/styleguide/tokens/typography',
      component: TypographyPage,
      meta: { breadcrumbs: sgCrumbs('Typografie') },
    },
    {
      path: '/styleguide/tokens/spacing',
      component: SpacingPage,
      meta: { breadcrumbs: sgCrumbs('Spacing') },
    },
    {
      path: '/styleguide/tokens/shadows',
      component: ShadowsPage,
      meta: { breadcrumbs: sgCrumbs('Schaduwen') },
    },
    {
      path: '/styleguide/tokens/borders',
      component: BordersPage,
      meta: { breadcrumbs: sgCrumbs('Borders') },
    },

    // Components
    {
      path: '/styleguide/components/button',
      component: ButtonPage,
      meta: { breadcrumbs: sgCrumbs('Button') },
    },
    {
      path: '/styleguide/components/icon-button',
      component: SwIconButtonPage,
      meta: { breadcrumbs: sgCrumbs('Icon Button') },
    },
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
  ],
})

export default router
