import { useLocalStorage } from './use-local-storage'

const TOKEN_KEY = 'token'
export default function useToken() {
	const token = useLocalStorage(TOKEN_KEY)

	const getToken = () => {
		return token
	}

	const setToken = (v: string) => {
		token.value = v
	}

	const hasToken = () => {
		return !!token.value
	}

	const revokeToken = () => {
		token.value = null
	}

	return {
		getToken,
		setToken,
		hasToken,
		revokeToken,
	}
}
