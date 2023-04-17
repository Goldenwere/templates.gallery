import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
} from 'vue-router'

import home from './views/home/home.vue'

const commission = () => import('./views/commission/commission.vue')
const gallery = () => import('./views/gallery/gallery.vue')
const tos = () => import('./views/tos/tos.vue')

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
]

export default createRouter({
  history: createWebHashHistory(),
  routes: SiteRoutes as RouteRecordRaw[],
})
