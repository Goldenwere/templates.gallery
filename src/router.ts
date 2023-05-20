import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router'

const homeBody = () => import('./views/home/home.vue')
const commissionBody = () => import('./views/commission/commission.vue')
const galleryBody = () => import('./views/gallery/gallery.vue')
const tosBody = () => import('./views/tos/tos.vue')
const viewBody = () => import('./views/view/view.vue')

export const SiteRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: homeBody,
    name: 'home',
  },
  {
    path: '/tos',
    component: tosBody,
    name: 'tos'
  },
  {
    path: '/commission',
    component: commissionBody,
    name: 'commission',
  },
  {
    path: '/gallery/:id',
    component: galleryBody,
    props: true,
    name: 'gallery',
  },
  {
    path: '/gallery/:id/:variantIds+',
    component: galleryBody,
    props: true,
    name: 'subgallery',
  },
  {
    path: '/view/:id/:variantIds+',
    component: viewBody,
    props: true,
    name: 'view',
  }
]

export default createRouter({
  history: createWebHistory(),
  routes: SiteRoutes as RouteRecordRaw[],
})
