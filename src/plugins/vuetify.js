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
  theme: {
    themes: {
      light: {
        primary: '#758589',
        secondary: '#afc5cb',
        accent: '#efd84d',
        error: '#b71c1c',
        success: '#26a151',
        // primary: '#3f51b5',
        // secondary: '#b0bec5',
        // accent: '#8c9eff',
        // error: '#b71c1c',
        // success: '#26a151',
      },
    },
  },
});
