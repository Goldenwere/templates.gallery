import { defineStore } from 'pinia'
import type commissionData from './types/views/commission'
import galleryContent from './types/galleryContent'
import type homeData from './types/views/home'
import type siteData from './types/views/site'
import type env from './types/env'
import tosData from './types/views/tos'

export const useStore = defineStore('store', {
  state: () => ({
    environment: {} as env,
    site: {} as siteData,
    home: {} as homeData,
    commission: {} as commissionData,
    tos: {} as tosData,
    galleries: {} as { [key: string]: galleryContent },

    hideHeader: false,
  }),
  actions: {
    setGalleryById(id: string, content: galleryContent) {
      this.galleries[id] = content
    },
  },
  getters: {
    getGalleryById: (state) => {
      return (id: string) => {
        return state.galleries[id]
      }
    }
  },
})
