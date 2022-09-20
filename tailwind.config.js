/** @type {import('tailwindcss').Config} */
// const formKitTailwind = require('@formkit/themes/tailwindcss');
import formKitTailwind from '@formkit/themes/tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

module.exports = {
	mode: 'jit',
	content: [
		'./components/**/*.{vue,js}',
		'./pages/**/*.vue',
		'./layouts/**/*.vue',
		'./app.vue',
		'./formkit.config.{js,mjs,ts}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Lato', ...defaultTheme.fontFamily.sans],
			},
			borderRadius: {
				DEFAULT: '0.125rem',
			},
		},
	},
	plugins: [formKitTailwind],
}
