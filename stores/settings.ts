import { defineStore } from 'pinia'
import { Settings } from '@/types'
import { apiInstance } from '@/plugins/api'

export const useSettingsStore = defineStore({
	id: 'settingsStore',
	state: () => {
		return {
			settings: {} as Settings,
		}
	},
	actions: {
		async getSettings() {
			try {
				const res = await apiInstance.get('/api/meta/settings')
				this.settings = res.data.data
			} catch (err) {
				throw new Error(err)
			}
		},
	},
})
