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
			const env = []
			if (workspace.spec.app.env) {
				for (const [k, v] of Object.entries(workspace.spec.app.env)) {
					env.push({ name: k, value: v })
				}
			}

			return {
				uid: workspace.metadata.uid,
				name: workspace.metadata.name,
				status: parseStatus(workspace.status),
				extensions: workspace.spec.extensions,
				domain: workspace.spec.domain,
				subdomain: workspace.spec.subdomain,
				app: {
					...workspace.spec.app,
					env,
				},
				webapp: {
					enabled: workspace.spec.webapp.enabled,
					version: workspace.spec.webapp.version,
				},
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
