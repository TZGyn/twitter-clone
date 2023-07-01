// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@vueuse/nuxt'],
    tailwindcss: {
        configPath: './tailwind.config.ts',
    },
    typescript: {
        strict: true,
    },
    runtimeConfig: {
        public: {
            api: 'http://dev.local:8000/api',
            url: 'http://dev.local:8000',
        },
    },
    ssr: false,
})
