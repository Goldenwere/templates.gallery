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
  },
]

export default createRouter({
  history: createWebHistory(),
  routes: SiteRoutes as RouteRecordRaw[],
})
