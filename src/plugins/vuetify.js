import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import de from 'vuetify/es5/locale/de';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#54646B',
        secondary: '#727E85',
        accent: '#EFD84E',
        error: '#CF6035',
        info: '#AFC5CB',
        success: '#EFD84E',
        warning: '#CF6035'
      },
    },
  },
    lang: {
      locales: { de },
      current: 'de',
    },
});
