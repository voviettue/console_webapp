import { Ref } from 'vue'
import merge from 'lodash/merge'
import { usePresetsStore } from '@/stores/presets'

interface UsablePreset {
	refreshInterval: Ref<number | null>
	settings: Ref<Record<string, any> | null>
}

export function useCollectionPreset(collection: string): UsablePreset {
	const presetsStore = usePresetsStore()
	const collectionPreset = merge(
		{
			refreshInterval: 5,
			settings: {},
		},
		presetsStore.getPreset(collection)
	)

	const refreshInterval = ref(collectionPreset.refreshInterval)
	const settings = ref(collectionPreset.settings)

	watch(refreshInterval, (newVal) => {
		presetsStore.savePreset({ collection, refreshInterval: newVal })
	})

	watch(
		settings,
		(newVal) => {
			presetsStore.savePreset({ collection, settings: { ...settings.value, ...newVal } })
		},
		{ deep: true }
	)

	return {
		refreshInterval,
		settings,
	}
}
