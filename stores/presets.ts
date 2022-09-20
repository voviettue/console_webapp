import { defineStore } from 'pinia'
import { Preset } from '@/types'

const { data } = useLocalStorage('collection_presets', [])

export const usePresetsStore = defineStore({
	id: 'presetStore',
	actions: {
		getPreset(collection: string): Preset {
			return data.value.find((preset) => preset.collection === collection) || null
		},
		savePreset(preset: Partial<Preset>) {
			const isExistingValue = !!data.value.find((item: any) => item.collection === preset.collection)
			if (isExistingValue) {
				data.value = data.value.map((item: any) => {
					return item.collection === preset.collection ? { ...item, ...preset } : item
				})
			} else {
				data.value.push(preset)
			}
		},
	},
})
