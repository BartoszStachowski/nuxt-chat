export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  css: ['@/assets/css/main.css'],

  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxtjs/mdc'],

  runtimeConfig: {
    openaiApiKey: process.env.NUXT_OPENAI_API_KEY,
  },

  vite: {
    optimizeDeps: {
      include: ['debug'],
    },
  },

  mdc: {
    highlight: {
      theme: 'material-theme-palenight',
      langs: ['html', 'markdown', 'vue', 'typescript', 'javascript'],
    },
  },
});
