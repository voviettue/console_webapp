import DisplayBoolean from '~/components/display/display-boolean.vue'
import DisplayStatus from '~/components/display/display-status.vue'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component('display-boolean', DisplayBoolean)
	nuxtApp.vueApp.component('display-status', DisplayStatus)
})
