import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router'

import home from './views/home/home.vue'

export const SiteRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: home,
    name: 'home',
  },
  {
    path: '/tos',
    component: home,
    name: 'tos'
  },
  {
    path: '/commission',
    component: home,
    name: 'commission',
  },
  {
    path: '/gallery/:id',
    component: home,
    props: true,
    name: 'gallery',
  },
]

export default createRouter({
  history: createWebHistory(),
  routes: SiteRoutes as RouteRecordRaw[],
})
