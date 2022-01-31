// Load Components
import Home from '@/pages/Home.vue'
import CalendarPage from '@/pages/CalendarPage.vue'
import TablePage from '@/pages/TablePage.vue'

let title = e => `${e} | Corporate Happiness ©`

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: title('Terminübersicht'),
      layout: 'events',
    }
  },
  {
    path: '/kalender',
    name: 'Calendar',
    component: CalendarPage,
    meta: {
      title: title('Kalenderansicht'),
      layout: 'events',
    }
  },
  {
    path: '/tabelle',
    name: 'Table',
    component: TablePage,
    meta: {
      title: title('Tabellenansicht'),
      layout: 'events',
    }
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
    component: () => import('@/pages/Upload.vue'),
    meta: {
      title: title('Datei hochladen'),
    },
  },
  {
    path: "/:catchAll(.*)",
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue'),
    meta: {
      title: title('404 Fehler'),
    },
  },
]