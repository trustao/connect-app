import Vuex from 'vuex'
import Vue from "vue";
import {getKeyFormStorage, setKeyToStorage} from './utils/auth'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    key: getKeyFormStorage(),
    routes: [],
    pageData: {}
  },
  mutations: {
    login (state, payload) {
      state.key = setKeyToStorage(payload)
    },
    addRoute (state, path) {
      console.log('addRoute', path)
      if (!state.routes.includes(path)) {
        state.routes.push(path)
      }
    },
    removeRoute (state, path) {
      const idx = state.routes.indexOf(path)
      if (idx >= 0) {
        state.pageData[path] = null
        state.routes.splice(idx, 1)
      }
    },
    clear (state) {
      state.routes.splice(0, state.routes.length)
    },
    setPageData (state, {path, data}) {
      state.pageData[path] = data
    }
  }
})

export default store