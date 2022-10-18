import { defineStore } from 'pinia'
import { MySQLInstance } from '@/types'
import { parseStatus } from '@/shared/stores'
import { compareName } from '@/shared/utils/compares'
import { apiInstance } from '@/plugins/api'

export const useMysqlInstancesStore = defineStore({
	id: 'mysqlInstancesStore',
	state() {
		return {
			mysqlInstances: [] as MySQLInstance[],
		}
	},
	actions: {
		async getMySQLInstances(orgId: string) {
			try {
				const res = await apiInstance.get(`/api/v1alpha1/orgs/${orgId}/mysqlinstances`)
				this.mysqlInstances = res.data.data.map(this.parseMySqlInstance).sort(compareName)
			} catch (err) {
				throw new Error(err)
			}
		},
		async getMySqlInstance(orgId: string, id: string) {
			try {
				const res = await apiInstance.get(`/api/v1alpha1/orgs/${orgId}/mysqlinstances/${id}`)
				return this.parseMySqlInstance(res.data.data)
			} catch (err) {
				throw new Error(err)
			}
		},
		parseMySqlInstance(mysqlInstance: any): MySQLInstance {
			return {
				uid: mysqlInstance.spec.uid,
				name: mysqlInstance.spec.name,
				status: parseStatus(mysqlInstance.status),
				storageGB: mysqlInstance.spec.storageGB,
				instanceClass: mysqlInstance.spec.instanceClass,
				createdAt: mysqlInstance.metadata.creationTimestamp,
			}
		},
	},
})
