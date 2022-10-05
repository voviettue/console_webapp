import { defineStore } from 'pinia'
import { Workspace } from '@/types'
import { parseStatus } from '@/shared/stores'
import { compareName } from '@/shared/utils/compares'
import { apiInstance } from '@/plugins/api'

export const useWorkspacesStore = defineStore({
	id: 'workspacesStore',
	state() {
		return {
			workspaces: [] as Workspace[],
		}
	},
	actions: {
		parseWorkspace(workspace: any): Workspace {
			return {
				uid: workspace.metadata.uid,
				name: workspace.metadata.name,
				status: parseStatus(workspace.status),
				extensions: workspace.spec.extensions,
				domain: workspace.spec.domain,
				subdomain: workspace.spec.subdomain,
			}
		},
		async getWorkspaces(orgId: string) {
			try {
				const res = await apiInstance.get(`/api/v1alpha1/orgs/${orgId}/workspaces`)
				this.workspaces = res.data.data.map(this.parseWorkspace).sort(compareName)
			} catch (err) {
				throw new Error(err)
			}
		},
		async getWorkspace(orgId: string, wsId: string) {
			try {
				const res = await apiInstance.get(`/api/v1alpha1/orgs/${orgId}/workspaces/${wsId}`)
				return this.parseWorkspace(res.data.data)
			} catch (err) {
				throw new Error(err)
			}
		},
	},
})
