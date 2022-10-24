import { defineStore } from 'pinia'
import { Org } from '@/types'
import { parseStatus } from '@/shared/stores'
import { compareName } from '@/shared/utils/compares'
import { apiInstance } from '@/plugins/api'

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
				createdAt: org.metadata.creationTimestamp,
			}
		},
		async getOrgs() {
			try {
				const res = await apiInstance.get(`/api/v1alpha1/orgs`)
				this.orgs = res.data.data.map(this.parseOrg).sort(compareName)
			} catch (err) {
				throw new Error(err)
			}
		},
		async getOrg(orgId: string) {
			try {
				const res = await apiInstance.get(`/api/v1alpha1/orgs/${orgId}`)
				return this.parseOrg(res.data.data)
			} catch (err) {
				throw new Error(err)
			}
		},
	},
})
