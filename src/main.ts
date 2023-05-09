import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin as VueTippy, roundArrow } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/dist/svg-arrow.css'
import 'tippy.js/animations/shift-away.css'
import './main.sass'
import router from './router'
import app from './main.vue'

createApp(app)
  .use(router)
  .use(createPinia())
  .use(VueTippy, {
    directive: 'tippy', // => v-tippy
    component: 'tippy', // => <tippy/>
    componentSingleton: 'tippy-singleton', // => <tippy-singleton/>,
    defaultProps: {
      animation: 'shift-away',
      arrow: roundArrow,
      placement: 'bottom',
      allowHTML: true,
      maxWidth: '11.5em',
    }, // => Global default options * see all props
  })
  .directive('focus', {
    mounted (el) {
      el.focus()
    },
  })
  .mount('#app')
