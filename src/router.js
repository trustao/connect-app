import VueRouter from 'vue-router'
import Layout from './layout/layout'
import View from './components/view'
import HelloWorld from './components/HelloWorld'
import store from './store'
import {authKey} from "./utils/auth"
import LockLayout from './layout/lockLayout'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: View
      },
      {
        path: ':type/*',
        component: View
      },
      {
        path: 'hello',
        component: HelloWorld
      }
    ]
  },
  {
    path: '/login',
    component: LockLayout
  }
]


const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  console.log('routerBefore', to.path )
  if (authKey(store.state.key) || to.path === '/login'){
    console.log('next')
    next()
  } else {
    next('/login')
  }
})

export default router