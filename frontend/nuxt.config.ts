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
			laravelApi: process.env.LARAVEL_API || 'http://192.168.100.40:8000',
			frontend_url:
				process.env.frontend_url || 'http://192.168.100.40:3000',
		},
	},
	ssr: false,
})
