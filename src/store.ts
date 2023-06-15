import { defineStore } from 'pinia'

import type CommissionViewModel from './types/views/commission'
import type galleryContent from './types/internal/galleryContent'
import type HomeViewModel from './types/views/home'
import type env from './types/internal/env'
import type AppViewModel from './types/views/app'
import type TosViewModel from './types/views/tos'

export const useStore = defineStore('store', {
  state: () => ({
    environment: {} as env,
    app: {} as AppViewModel,
    home: {} as HomeViewModel,
    commission: {} as CommissionViewModel,
    tos: {} as TosViewModel,
    galleries: {} as { [key: string]: galleryContent },

    acknowledgedMaturity: false,
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
        return state.app.directories.find(other => other.title === title)
      }
    }
  },
})
