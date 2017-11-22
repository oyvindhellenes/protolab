import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Cafe from '@/components/Cafe'
import Reodor from '@/components/Reodor'
import Medlem from '@/components/Medlem'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/heim',
      name: 'Home',
      component: Home
    },
    {
      path: '/cafe',
      name: 'Cafe',
      component: Cafe
    },
    {
      path: '/reodorklubben',
      name: 'Reodor',
      component: Reodor
    },
    {
      path: '/medlem',
      name: 'Medlem',
      component: Medlem
    },
    {
      path: '*',
      redirect: '/heim'
    }
  ]
})
