import { defineStore } from 'pinia'

const { data } = useLocalStorage('app_settings', {
	sidebar: {
		collapsed: false,
	},
})

export const useAppStore = defineStore({
	id: 'appStore',
	state: () => {
		return {
			settings: data,
		}
	},
	actions: {
		toggleSidebar() {
			this.settings.sidebar.collapsed = !this.settings.sidebar.collapsed
		},
	},
	getters: {
		isSidebarCollapsed: (state) => {
			return state.settings.sidebar.collapsed
		},
	},
})
