import { defineStore } from 'pinia'
import type home from './types/views/home'
import type site from './types/views/site'

export const useStore = defineStore('store', {
  state: () => ({
    site: {} as site,
    home: {} as home
  }),
})
