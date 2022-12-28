export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      BACKEND_URL: process.env.NUXT_BACKEND_URL || 'http://localhost:8910'
    }
  }
})
