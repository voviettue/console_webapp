import { defineStore } from 'pinia'
import { apiInstance } from '@/plugins/api'
import { Extension } from '@/types'

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
		parseExtension(ext: any): Extension {
			return {
				image: ext.image,
				title: ext.title,
				description: ext.description,
				package: ext.package,
				namespace: ext.namespace,
				defaultDisplayVersion: ext.defaultDisplayVersion,
				updatedAt: ext.updatedAt,
				syncedAt: ext.syncedAt,
				public: ext.public,
				category: ext.category,
			}
		},
		async getExtensions(query?: Record<string, any>) {
			try {
				const res = await apiInstance.get('/api/meta/extensions', { params: query })
				this.rawExtensions = res.data.data.map(this.parseExtension)
			} catch (err) {
				throw new Error(err)
			}
		},
		async getExtension(id: string) {
			try {
				const res = await apiInstance.get(`/api/meta/extensions/${id}`)
				return this.parseExtension(res.data.data)
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
			return state.rawExtensions
		},
	},
})
