import { defineStore } from 'pinia'
import { Notification } from '@/types'

export const useNotificationsStore = defineStore({
	id: 'notificationsStore',
	state() {
		return {
			notifications: [] as Notification[],
		}
	},
	actions: {
		addItem(item: Partial<Notification>) {
			this.notifications.unshift({
				id: Date.now(),
				...item,
			})
		},
		removeItem(id: string | number) {
			this.notifications = this.notifications.filter((item: Notification) => item.id !== id)
		},
	},
})
