export default {
  env: {
    NUXT_ENV_API_URL:
      process.env.NUXT_ENV_API_URL || 'http://185.181.229.182:4000/api',
  },
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'VotDiaspora',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Vot Diaspora este o platformă dezvoltată de Code for Romania care oferă rapid românilor din Diaspora informații despre cum pot vota la alegerile generale din Noiembrie 2020.',
      },
      { property: 'og:title', content: 'Vot Moldova' },
      {
        property: 'og:image',
        content: '~/assets/votdiaspora_logo_1.svg',
      },
      {
        name: 'theme-color',
        content: '#0A2758',
      },
      {
        property: 'og:description',
        content:
          'Vot Diaspora este o platformă dezvoltată de Code for Romania care oferă rapid românilor din Diaspora informații despre cum pot vota la alegerile generale din decembrie 2020.',
      },
      { property: 'og:url', content: 'https://votdiaspora.ro' },
      { property: 'og:type', content: 'website' },
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://js.api.here.com/v3/3.1/mapsjs-ui.css',
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.jpg' },
    ],
    script: [
      {
        src: 'https://js.api.here.com/v3/3.1/mapsjs-core.js',
      },
      {
        src: 'https://js.api.here.com/v3/3.1/mapsjs-service.js',
      },
      {
        src: 'https://js.api.here.com/v3/3.1/mapsjs-mapevents.js',
      },
      {
        src: 'https://js.api.here.com/v3/3.1/mapsjs-ui.js',
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: ['~/scss/style.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: false,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['nuxt-i18n', '@nuxtjs/gtm'],
  gtm: {
    id: 'G-L8W93HP5VY',
  },
  i18n: {
    detectBrowserLanguage: false,
    locales: [
      {
        code: 'ro',
        name: 'RO',
        file: 'ro-RO.js',
      },
      {
        code: 'ru',
        name: 'RU',
        file: 'ru-RU.js',
      },
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'ro',
    vueI18n: {
      fallbackLocale: 'ro',
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: [({ isServer }) => 'vue-typeahead-bootstrap'],
  },
}
