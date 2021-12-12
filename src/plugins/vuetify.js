import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

// Translation provided by Vuetify (javascript)
import de from 'vuetify/lib/locale/de'

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { de },
    current: 'de',
  },
});
