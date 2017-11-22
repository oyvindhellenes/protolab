import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Cafe from '@/components/Cafe'
import Reodor from '@/components/Reodor'
import Member from '@/components/Member'

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
      path: '/member',
      name: 'Member',
      component: Member
    },
    {
      path: '*',
      redirect: '/heim'
    }
  ]
})
