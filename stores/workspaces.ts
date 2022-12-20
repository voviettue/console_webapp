import { defineStore } from 'pinia'
import { Workspace } from '@/types'
import { parseStatus } from '@/shared/stores'
import { compareName } from '@/shared/utils/compares'
import { apiInstance } from '@/plugins/api'

export function parseWorkspace(ws: any): Workspace {
	const env = []
	if (ws.spec.app.env) {
		for (const [k, v] of Object.entries(ws.spec.app.env)) {
			env.push({ name: k, value: v })
		}
	}

	return {
		uid: ws.metadata.uid,
		name: ws.metadata.name,
		status: parseStatus(ws.status),
		extensions: ws.spec.extensions,
		domain: ws.spec.domain,
		subdomain: ws.spec.subdomain,
		app: {
			...ws.spec.app,
			env,
		},
		webapp: {
			enabled: ws.spec?.webapp?.enabled,
			version: ws.spec?.webapp?.version,
		},
		createdAt: ws.metadata.creationTimestamp,
		dbName: `${ws.spec.orgRefName}-${ws.spec.dbRefName}-${ws.spec.name}`,
		snapshotEnabled: ws.spec.actions?.snapshot?.enabled,
		deletionProtection: ws.spec.deletionProtection,
		org: ws.spec.orgRefName,
		ledger: {
			...ws.spec.ledger,
			status: ws.status.ledger ? ws.status.ledger.status : null,
		},
	}
}

export const useWorkspacesStore = defineStore({
	id: 'workspacesStore',
	state() {
		return {
			workspaces: [] as Workspace[],
		}
	},
	actions: {
		async getWorkspaces(org: string) {
			try {
				const res = await apiInstance.get(`/api/v1alpha1/orgs/${org}/workspaces`)
				this.workspaces = res.data.data.map(parseWorkspace).sort(compareName)
			} catch (err) {
				throw new Error(err)
			}
		},
		async getWorkspace(org: string, ws: string) {
			try {
				const res = await apiInstance.get(`/api/v1alpha1/orgs/${org}/workspaces/${ws}`)
				return parseWorkspace(res.data.data)
			} catch (err) {
				throw new Error(err)
			}
		},
	},
})
