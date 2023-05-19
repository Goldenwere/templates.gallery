import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router'

import home from './views/home/home.vue'

const commission = () => import('./views/commission/commission.vue')
const gallery = () => import('./views/gallery/gallery.vue')
const tos = () => import('./views/tos/tos.vue')
const view = () => import('./views/view/view.vue')

export const SiteRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: home,
    name: 'home',
  },
  {
    path: '/tos',
    component: tos,
    name: 'tos'
  },
  {
    path: '/commission',
    component: commission,
    name: 'commission',
  },
  {
    path: '/gallery/:id',
    component: gallery,
    props: true,
    name: 'gallery',
  },
  {
    path: '/gallery/:id/:variantIds+',
    component: gallery,
    props: true,
    name: 'subgallery',
  },
  {
    path: '/view/:id/:variantIds+',
    component: view,
    props: true,
    name: 'view',
  }
]

export default createRouter({
  history: createWebHistory(),
  routes: SiteRoutes as RouteRecordRaw[],
})
