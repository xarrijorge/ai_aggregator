// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@/assets/css/tailwind.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxt/content'],
  content: {
    // Optional: Configure markdown options
    markdown: {
      remarkPlugins: [],
      rehypePlugins: [],
      toc: {
        depth: 3, // Table of contents depth
        searchDepth: 3
      }
    }
  }
})