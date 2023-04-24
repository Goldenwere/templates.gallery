import { defineStore } from 'pinia'
import type gallery from './types/views/gallery'
import type home from './types/views/home'
import type site from './types/views/site'

export const useStore = defineStore('store', {
  state: () => ({
    site: {} as site,
    home: {} as home,
    galleries: [] as {
      id: string,
      gallery: gallery,
    }[],
  }),
})
