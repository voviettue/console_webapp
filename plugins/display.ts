import { Skeletor } from 'vue-skeletor'
import DisplayBoolean from '~/components/display/boolean.vue'
import DisplayStatus from '~/components/display/status.vue'
import DisplayDate from '~/components/display/date.vue'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component('display-boolean', DisplayBoolean)
	nuxtApp.vueApp.component('display-status', DisplayStatus)
	nuxtApp.vueApp.component('display-date', DisplayDate)
	nuxtApp.vueApp.component(Skeletor.name, Skeletor)
})
