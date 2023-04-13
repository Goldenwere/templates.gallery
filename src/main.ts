import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './main.sass'
import router from './router'
import app from './main.vue'

createApp(app)
  .use(router)
  .use(createPinia())
  .directive('focus', {
    mounted (el) {
      el.focus()
    },
  })
  .mount('#app')
