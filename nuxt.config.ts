import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	ssr: false,
	modules: ['@nuxtjs/tailwindcss', '@formkit/nuxt', 'nuxt-icons'],
	buildModules: ['@pinia/nuxt'],
	runtimeConfig: {
		public: {
			url: 'http://localhost:3000',
			api: {
				baseUrl: 'https://dev.terminal.catex.se',
			},
			cognito: {
				domain: '',
				clientId: '',
				scope: ''
			}
		}
	},
	formkit: {
		configFile: './formkit.config.ts'
	}
})
