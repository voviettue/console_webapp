import axios from 'axios'

const onResponseSuccess = (response) => {
	console.log('>>> response success:', response.config.url) // eslint-disable-line no-console
	return response
}

const onResponseError = (error) => {
	console.error('>>> reponse error', error) // eslint-disable-line no-console
	return Promise.reject(error)
}

export const apiInstance = axios.create()

apiInstance.interceptors.response.use(onResponseSuccess, onResponseError)

export default defineNuxtPlugin(() => {
	return {
		provide: {
			api: apiInstance,
		},
	}
})
