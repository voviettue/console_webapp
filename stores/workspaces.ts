import { defineStore } from 'pinia'
import { Workspace } from '@/types'
import { parseStatus } from '@/shared/stores'
import { compareName } from '@/shared/utils/compares'

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
			const { data, error } = await useFetch<any>(`/api/orgs/${orgId}/workspaces`, { initialCache: false })
			if (error.value) {
				throw new Error('Cannot get workspaces')
			}
			this.workspaces = data.value.data.map(this.parseWorkspace).sort(compareName)
		},
		async getWorkspace(orgId: string, wsId: string) {
			const { data, error } = await useFetch<any>(`/api/orgs/${orgId}/workspaces/${wsId}`, { initialCache: false })
			if (error.value) {
				throw new Error(`Cannot get workspace ${wsId}`)
			}
			return this.parseWorkspace(data.value.data)
		},
	},
})
