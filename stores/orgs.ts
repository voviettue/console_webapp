import { defineStore } from 'pinia'
import { Org } from '@/types'
import { parseStatus } from '@/shared/stores'

export const useOrgsStore = defineStore({
	id: 'orgsStore',
	state: () => {
		return {
			orgs: [] as Org[],
		}
	},
	actions: {
		parseOrg(org: any): Org {
			return {
				uid: org.metadata.uid,
				name: org.metadata.name,
				status: parseStatus(org.status),
			}
		},
		async getOrgs() {
			const { data, error } = await useFetch<any>('/api/orgs', { initialCache: false })

			if (error.value) {
				throw new Error(`Cannot get organizations`)
			}

			this.orgs = data.value.data.map(this.parseOrg)
		},
		async getOrg(orgId: string) {
			const { data, error } = await useFetch<any>(`/api/orgs/${orgId}`, { initialCache: false })
			if (error.value) {
				throw new Error(`Cannot get organization ${orgId}`)
			}

			return this.parseOrg(data.value.data)
		},
	},
})
