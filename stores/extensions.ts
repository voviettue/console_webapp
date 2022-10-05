import { defineStore } from 'pinia'
import { apiInstance } from '@/plugins/api'

const DEFAULT_EXTENSIONS = ['base', 'pro']

export const useExtensionsStore = defineStore({
	id: 'extensionsStore',
	state: () => {
		return {
			rawExtensions: [], // @TODO: consider this name
			isFetchingExtensions: false,
		}
	},
	actions: {
		parseExtensions(ext: any) {
			return {
				name: ext.name,
				title: ext.name, // @TODO: update
				description: 'x-' + ext.name, // @TODO: udpate
			}
		},
		async getExtensions() {
			try {
				const res = await apiInstance.get('/api/meta/extensions')
				this.rawExtensions = res.data.data.map(this.parseExtensions)
			} catch (err) {
				throw new Error(err)
			}
		},
	},
	getters: {
		defaultExtensions(state) {
			return state.rawExtensions.filter((e) => DEFAULT_EXTENSIONS.includes(e.name))
		},
		extensions(state) {
			return state.rawExtensions.filter((e) => !DEFAULT_EXTENSIONS.includes(e.name))
		},
	},
})
