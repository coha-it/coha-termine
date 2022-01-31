// Load Components
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes'

// Load Layouts
import Default from '@/layouts/Default'
import Events from '@/layouts/Events'

// Add Layouts
Vue.component('default-layout', Default)
Vue.component('events-layout', Events)


// Use Router
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach( (to, from, next) => {
  const title = to?.meta.title
  if (title) {
    document.title = title
  }

  next();
});

export default router
