import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin as VueTippy, roundArrow } from 'vue-tippy'

import 'tippy.js/dist/tippy.css'
import 'tippy.js/dist/svg-arrow.css'
import 'tippy.js/animations/shift-away.css'
import './main.sass'

import { envProd } from '@/src/env.prod'
import { fetchAndParseYaml } from '@/src/utilities/fetch'
import router, { pushRoutes } from '@/src/router'
import { useStore } from '@/src/store'

import type Environment from '@/src/types/internal/environment'
import type AppViewModel from '@/src/types/views/app'

import app from '@/src/main.vue'

fetchAndParseYaml('/content/app.yml')
  .then(async (content) => {
    pushRoutes((content as AppViewModel).directories)

    const instance = createApp(app)
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

    const store = useStore()
    const environment: Environment = envProd
    store.$patch({ environment: environment as Environment })
    store.$patch({ app: content as AppViewModel })
    instance.mount('#app')
    if (!!store.app.themes && store.app.themes.length > 0) {
      const themeOutlet = document.createElement('link')
      themeOutlet.setAttribute('href', store.app.themes[0].location)
      themeOutlet.setAttribute('rel', 'stylesheet')
      themeOutlet.setAttribute('id', 'theme-outlet')
      document.querySelector('head')?.appendChild(themeOutlet)
      store.setTheme(store.app.themes[0])
    }
  })
