import { useLocalStorage } from './use-local-storage'

const TOKEN_KEY = 'token'

export default function useToken() {
	const token = useLocalStorage(TOKEN_KEY)

	const getToken = () => {
		return token
	}

	const setToken = (v: string): void => {
		token.value = v
	}

	const hasToken = (): boolean => {
		return !!token.value
	}

	const revokeToken = (): void => {
		token.value = null
	}

	return {
		getToken,
		setToken,
		hasToken,
		revokeToken,
	}
}
