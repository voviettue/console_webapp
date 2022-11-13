import { defineStore } from 'pinia'
import { apiInstance } from '@/plugins/api'
import { Template } from '@/types'

export const useTemplatesStore = defineStore({
	id: 'templatesStore',
	state: () => {
		return {
			templates: [] as Template[],
		}
	},
	actions: {
		parseTemplate(tpl: any): Template {
			return {
				name: tpl.name,
				title: tpl.title,
				description: tpl.description,
				org: tpl.org,
				workspace: tpl.workspace,
				public: tpl.public,
				updatedAt: tpl.updatedAt,
				syncedAt: tpl.syncedAt,
				category: tpl.category,
			}
		},
		async getTemplates() {
			try {
				const res = await apiInstance.get('/api/meta/templates')
				this.templates = res.data.data.map(this.parseTemplate)
			} catch (err) {
				throw new Error(err)
			}
		},
		async getTemplate(id: string) {
			try {
				const res = await apiInstance.get(`/api/meta/templates/${id}`)
				return this.parseTemplate(res.data.data)
			} catch (err) {
				throw new Error(err)
			}
		},
	},
})
