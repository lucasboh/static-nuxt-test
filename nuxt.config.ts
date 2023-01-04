import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: 'title', content: 'Sociedad Constructora Chaco' },
        // { name: 'theme-color', content: '#d42b0d' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
  css: [
    '@/assets/styles/global.scss',
    '@/assets/styles/variables.scss',
    '@/assets/styles/fonts.scss',
  ],
  runtimeConfig: {
    public: {
      STRAPI_URL: process.env.STRAPI_URL,
    },
  },
  modules: [
    '@nuxtjs/strapi',
  ],
  strapi: {
    url: process.env.STRAPI_URL,
    prefix: '/api',
    version: 'v4',
  },
  // image: {
  //   domains: [ process.env.APP_URL as string, process.env.STRAPI_IMG_URL as string ],
  //   strapi: {
  //     baseURL: `${process.env.STRAPI_IMG_URL}/`,
  //   },
  // },
})
