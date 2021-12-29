
// Vue Moment
import Vue from 'vue'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import 'moment/locale/de'

moment.locale('de')
 
Vue.use(VueMoment, {
  moment,
})

export default Vue
