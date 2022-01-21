// Load Components
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home.vue'
import CalendarPage from '@/pages/CalendarPage.vue'
import TablePage from '@/pages/TablePage.vue'

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
    meta: { layout: 'events' }
  },
  {
    path: '/kalender',
    name: 'Calendar',
    component: CalendarPage,
    meta: { layout: 'events' }
  },
  {
    path: '/tabelle',
    name: 'Table',
    component: TablePage,
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
    path: '/upload/:type?',
    name: 'Upload',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/pages/Upload.vue')
  },
  {
    path: "/:catchAll(.*)",
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
