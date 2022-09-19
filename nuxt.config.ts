import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	ssr: false,
	modules: ['@nuxtjs/tailwindcss', '@formkit/nuxt', 'nuxt-icons', '@pinia/nuxt'],
	buildModules: ['@pinia/nuxt'],
	runtimeConfig: {
		public: {
			url: 'http://localhost:3000',
			cognito: {
				domain: '',
				clientId: '',
				scope: ''
			}
		},
		api: {
			baseUrl: '',
		},
	},
	formkit: {
		configFile: './formkit.config.ts'
	}
})
