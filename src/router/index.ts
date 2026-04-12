import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ColorsPage from '@/pages/styleguide/ColorsPage.vue'
import TypographyPage from '@/pages/styleguide/TypographyPage.vue'
import SpacingPage from '@/pages/styleguide/SpacingPage.vue'
import ShadowsPage from '@/pages/styleguide/ShadowsPage.vue'
import BordersPage from '@/pages/styleguide/BordersPage.vue'
import ButtonPage from '@/pages/styleguide/ButtonPage.vue'
import SwHeadingPage from '@/pages/styleguide/SwHeadingPage.vue'
import SwTextPage from '@/pages/styleguide/SwTextPage.vue'
import SwLabelPage from '@/pages/styleguide/SwLabelPage.vue'
import SwCodePage from '@/pages/styleguide/SwCodePage.vue'
import SwIconButtonPage from '@/pages/styleguide/SwIconButtonPage.vue'

type Crumb = { label: string; icon?: string; to?: string }

function sgCrumbs(...labels: string[]): Crumb[] {
  return [
    { label: 'Home', icon: 'house', to: '/' },
    { label: 'Styleguide' },
    ...labels.map((l) => ({ label: l })),
  ]
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
      meta: { breadcrumbs: [{ label: 'Home', icon: 'house', to: '/' }] },
    },

    // Design tokens
    { path: '/styleguide/tokens/colors',     component: ColorsPage,     meta: { breadcrumbs: sgCrumbs('Kleuren') } },
    { path: '/styleguide/tokens/typography', component: TypographyPage, meta: { breadcrumbs: sgCrumbs('Typografie') } },
    { path: '/styleguide/tokens/spacing',    component: SpacingPage,    meta: { breadcrumbs: sgCrumbs('Spacing') } },
    { path: '/styleguide/tokens/shadows',       component: ShadowsPage,       meta: { breadcrumbs: sgCrumbs('Schaduwen') } },
    { path: '/styleguide/tokens/borders', component: BordersPage, meta: { breadcrumbs: sgCrumbs('Borders') } },

    // Components
    { path: '/styleguide/components/button',      component: ButtonPage,      meta: { breadcrumbs: sgCrumbs('Button') } },
    { path: '/styleguide/components/icon-button', component: SwIconButtonPage, meta: { breadcrumbs: sgCrumbs('Icon Button') } },
    { path: '/styleguide/components/heading',     component: SwHeadingPage,   meta: { breadcrumbs: sgCrumbs('SwHeading') } },
    { path: '/styleguide/components/text',        component: SwTextPage,      meta: { breadcrumbs: sgCrumbs('SwText') } },
    { path: '/styleguide/components/label',       component: SwLabelPage,     meta: { breadcrumbs: sgCrumbs('SwLabel') } },
    { path: '/styleguide/components/code',        component: SwCodePage,      meta: { breadcrumbs: sgCrumbs('SwCode') } },
  ],
})

export default router
