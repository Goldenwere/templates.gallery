import { defineStore } from 'pinia'

import type AppTheme from './types/views/shared/appTheme'
import type CommissionViewModel from './types/views/commission'
import type GalleryContent from './types/internal/galleryContent'
import type HomeViewModel from './types/views/home'
import type Environment from './types/internal/environment'
import type AppViewModel from './types/views/app'
import type TosViewModel from './types/views/tos'

export const useStore = defineStore('store', {
  state: () => ({
    environment: {} as Environment,
    app: {} as AppViewModel,
    home: {} as HomeViewModel,
    commission: {} as CommissionViewModel,
    tos: {} as TosViewModel,
    galleries: {} as { [key: string]: GalleryContent },

    acknowledgedMaturity: false,
    hideHeader: false,
    currentTheme: null as unknown as AppTheme,
  }),
  actions: {
    setGalleryById(id: string, content: GalleryContent) {
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
