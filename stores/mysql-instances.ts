import { defineStore } from 'pinia'
import { MySQLInstance } from '@/types'
import { parseStatus } from '@/shared/stores'

export const useMysqlInstancesStore = defineStore({
	id: 'mysqlInstancesStore',
	state() {
		return {
			mysqlInstances: [] as MySQLInstance[],
		}
	},
	actions: {
		async getMySQLInstances(orgId: string) {
			const { data, error } = await useFetch<any>(`/api/orgs/${orgId}/mysqlinstances`, { initialCache: false })
			if (error.value) {
				return error.value
			}
			this.mysqlInstances = data.value.data.map(this.parseMySQLInstance)
		},
		parseMySQLInstance(mysqlInstance: any): MySQLInstance {
			return {
				name: mysqlInstance.metadata.name,
				status: parseStatus(mysqlInstance.status),
			}
		},
	},
})
