import Vue from 'vue'
import VueRouter from 'vue-router'
import Inbox from '../views/Inbox.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'inbox',
    component: Inbox
  }
]

const router = new VueRouter({
  routes
})

export default router
