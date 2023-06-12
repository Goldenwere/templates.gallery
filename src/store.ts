import { defineStore } from 'pinia'

import type commissionData from './types/views/commission'
import type galleryContent from './types/internal/galleryContent'
import type homeData from './types/views/home'
import type env from './types/internal/env'
import type siteData from './types/views/site'
import type tosData from './types/views/tos'

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
    },
    getGalleryConfigByTitle: (state) => {
      return (title: string) => {
        return state.site.directories.find(other => other.title === title)
      }
    }
  },
})
