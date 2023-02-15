import {
  createApp,
} from 'vue'
import {
  createStore,
} from 'vuex'
import * as AppStore from './store/store'
import App from './main.vue'
import router from './router'

import './main.sass'

const store = createStore({
  state: AppStore.state,
  getters: AppStore.getter,
  mutations: AppStore.mutations,
})

createApp(App)
  .use(router)
  .use(store)
  .directive('focus', {
    mounted (el) {
      el.focus()
    },
  })
  .mount('#app')
