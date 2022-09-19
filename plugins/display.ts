import DisplayBoolean from '~/components/display/display-boolean.vue'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component('display-boolean', DisplayBoolean)
})
