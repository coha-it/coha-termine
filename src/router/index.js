// Load Components
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Calendar from '../views/Calendar.vue'
import Table from '../views/Table.vue'

// Load Layouts
import Default from '@/layouts/Default'
import Events from '@/layouts/Events'

// Add Layouts
Vue.component('default-layout', Default)
Vue.component('events-layout', Events)

// Use Router
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { layout: 'default' }
  },
  {
    path: '/kalender',
    name: 'Calendar',
    component: Calendar,
    meta: { layout: 'events' }
  },
  {
    path: '/tabelle',
    name: 'Table',
    component: Table,
    meta: { layout: 'events' }
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/upload',
    name: 'Upload',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/Upload.vue')
  },
  {
    path: "/:catchAll(.*)",
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
