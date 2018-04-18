import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import UserPage from '@/components/UserPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/user/:userID',
      name: 'UserPage',
      component: UserPage
    },
  ]
})
