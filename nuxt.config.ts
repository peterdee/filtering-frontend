export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      BACKEND_URL: process.env.NUXT_BACKEND_URL || 'http://localhost:8910',
      MAX_FILE_SIZE: (Number(process.env.NUXT_MAX_FILE_SIZE) || 2048) * 1024
    }
  }
})
