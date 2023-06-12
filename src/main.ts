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

import type env from '@/src/types/internal/env'
import type site from '@/src/types/views/site'

import app from '@/src/main.vue'

fetchAndParseYaml('/content/site.yml')
  .then(async (content) => {
    pushRoutes((content as site).directories)

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
    const environment: env = envProd
    store.$patch({ environment: environment as env })
    store.$patch({ site: content as site })
    instance.mount('#app')
  })
