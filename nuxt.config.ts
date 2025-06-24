// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  srcDir: 'src',
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    'vue3-carousel-nuxt',
    '@nuxt/image'
  ],
  tailwindcss: {
    configPath: 'src/tailwind.config.ts',
  }
})