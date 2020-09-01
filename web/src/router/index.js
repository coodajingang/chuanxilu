import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import EveryDay from '../views/EveryDay.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/everyDay',
    name: 'EveryDay',
    component: EveryDay
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
