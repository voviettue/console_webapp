export function useToken() {
	const { data } = useLocalStorage('token')

	const getToken = () => {
		return data
	}

	const setToken = (v: string): void => {
		data.value = v
	}

	const hasToken = (): boolean => {
		return !!data.value
	}

	const revokeToken = (): void => {
		data.value = null
	}

	return {
		getToken,
		setToken,
		hasToken,
		revokeToken,
	}
}
