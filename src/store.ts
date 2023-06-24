import { defineStore } from 'pinia'

import { storage } from './utilities/fetch'

import type AppTheme from './types/views/shared/appTheme'
import type CommissionViewModel from './types/views/commission'
import type GalleryContent from './types/internal/galleryContent'
import type HomeViewModel from './types/views/home'
import type Environment from './types/internal/environment'
import type AppViewModel from './types/views/app'
import type TosViewModel from './types/views/tos'

export const useStore = defineStore('store', {
  state: () => ({
    _ready: false,

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
    setTheme(newTheme: AppTheme) {
      this.currentTheme = newTheme
      storage.write(`${this.app.title}:theme`, newTheme)
      document.querySelector('#theme-outlet')?.setAttribute('href', newTheme.location)
    },
    setAcknowledged() {
      this.acknowledgedMaturity = true
      storage.write(`${this.app.title}:acknowledgedMaturity`, true)
    }
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
