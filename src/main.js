import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import moment  from './plugins/moment'
import router from './router'

Vue.config.productionTip = false

require('@/styles/custom.scss')

new Vue({
  vuetify,
  router,
  moment,
  render: h => h(App)
}).$mount('#app')
