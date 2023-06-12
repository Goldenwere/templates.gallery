import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router'

import type templateType from '@/src/types/views/shared/templateType'
import type directoryRoute from '@/src/types/views/shared/directoryRoute'

const homeBody = () => import('./views/home/home.vue')
const commissionBody = () => import('./views/commission/commission.vue')
const galleryBody = () => import('./views/gallery/gallery.vue')
const tosBody = () => import('./views/tos/tos.vue')
const viewBody = () => import('./views/view/view.vue')

export const siteRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: homeBody,
    name: 'home',
  },
]

export const templates: {[ key: string ]: () => Promise<any>} = {
  'lander': homeBody,
  'gallery': galleryBody,
  'view': viewBody,
  'tos': tosBody,
  'commission': commissionBody,
}

export const pushRoute = (directory: directoryRoute): void => {
  const {
    template = 'gallery',
  } = directory
  switch (template) {
    case 'gallery':
      router.addRoute({
        path: `/${directory.path}`,
        name: `gallery: ${directory.title}`,
        component: templates['gallery'],
      })
      router.addRoute({
        path: `/${directory.path}/:variantIds+`,
        name: `subgallery: ${directory.title}`,
        component: templates['gallery'],
        props: true,
      })
      router.addRoute({
        path: `/${directory.path}/:variantIds+/view`,
        name: `view: ${directory.title}`,
        component: templates['view'],
        props: true,
      })
      break
    default:
      router.addRoute({
        path: `/${directory.path}`,
        name: directory.title,
        component: templates[template],
      })
      break
  }
}

export const pushRoutes = (directories: directoryRoute[]): void => {
  directories.forEach((directory) => {
    pushRoute(directory)
  })
}

export const getRoute = (directory: directoryRoute): RouteRecordRaw | undefined => {
  const {
    template = 'gallery',
  } = directory
  switch (template) {
    case 'gallery':
      return router.getRoutes().find((other) => other.name?.toString() === `gallery: ${directory.title}`)
    default:
      return router.getRoutes().find((other) => other.name?.toString() === directory.title)
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: siteRoutes,
})

export default router
