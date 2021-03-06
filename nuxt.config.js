import colors from 'vuetify/es5/util/colors'

export default {
  head: {
    titleTemplate: '%s | Folk ARPS',
    title: 'Welcome',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: [
    '~/assets/style',
    '@mdi/font/css/materialdesignicons.css',
    '@fontsource/roboto/400.css',
    '@fontsource/roboto/500.css',
    '@fontsource/roboto/700.css',
  ],

  plugins: [],
  components: true,
  buildModules: ['@nuxtjs/vuetify', '@nuxtjs/google-analytics'],
  googleAnalytics: {
    id: 'G-2TH60K869J',
  },
  modules: ['@nuxt/content'],
  content: {},
  vuetify: {
    defaultAssets: false,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#a9061a',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        dark: {
          primary: '#a9061a',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  build: {},
  target: 'static',

  server: {
    host: '0',
    port: 8080,
  },
}
