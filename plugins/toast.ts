import { useNotificationsStore } from '@/stores/notifications'
import { Notification } from '@/types/notifications'

export default defineNuxtPlugin(() => {
	const store = useNotificationsStore()
	return {
		provide: {
			toast: {
				success(item: Partial<Notification>) {
					store.addItem({
						type: 'success',
						...item,
					})
				},
				error(item: Partial<Notification>) {
					store.addItem({
						type: 'error',
						...item,
					})
				},
			},
		},
	}
})
