export function useLocalStorage<T extends string | number | boolean | object | null>(key: string, defaultValue?: T) {
	const internalKey = `console_webapp_${key}`
	const data = ref<T>(defaultValue)

	function getExistingValue() {
		let rawValue
		try {
			rawValue = localStorage.getItem(internalKey)
		} catch (err: any) {
			throw new Error(`[use-local-storage] ${err}`)
		}

		if (!rawValue) return

		try {
			data.value = JSON.parse(rawValue)
		} catch (err: any) {
			throw new Error(`[use-local-storage] ${err}`)
		}
	}

	getExistingValue()

	watch(
		data,
		() => {
			try {
				if (data.value === null) {
					localStorage.removeItem(internalKey)
				} else {
					localStorage.setItem(internalKey, JSON.stringify(data.value))
				}
			} catch (err: any) {
				throw new Error(`[use-local-storage] ${err}`)
			}
		},
		{ deep: true }
	)

	return { data }
}
