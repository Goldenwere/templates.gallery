import { defineStore } from 'pinia'
import type commission from './types/views/commission'
import type gallery from './types/views/gallery'
import type home from './types/views/home'
import type site from './types/views/site'
import type env from './types/env'
import tos from './types/views/tos'

export const useStore = defineStore('store', {
  state: () => ({
    environment: {} as env,
    site: {} as site,
    home: {} as home,
    commission: {} as commission,
    tos: {} as tos,
    galleries: [] as {
      id: string,
      gallery: gallery,
    }[],

    hideHeader: false,
  }),
})
