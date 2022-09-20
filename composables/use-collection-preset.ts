import { Ref } from 'vue'
import { usePresetsStore } from '@/stores/presets'

interface UsablePreset {
	refreshInterval: Ref<number | null>
}

export function useCollectionPreset(collection: string): UsablePreset {
	const presetsStore = usePresetsStore()
	const collectionPreset = presetsStore.getPreset(collection)

	const refreshInterval = ref(collectionPreset ? collectionPreset.refreshInterval : 5)
	watch(refreshInterval, (newVal) => {
		presetsStore.savePreset({ collection, refreshInterval: newVal })
	})

	return {
		refreshInterval,
	}
}
