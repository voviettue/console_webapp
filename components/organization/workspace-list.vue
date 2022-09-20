<template>
	<div>
		<div class="mb-4 flex items-center justify-end space-x-2">
			<TwButton @click="navigateTo(`/organizations/${orgId}/new-workspace`)">New workspace</TwButton>
			<DropdownAutoRefresh v-model="refreshInterval" @refresh="refresh" />
		</div>
		<div class="bg-white shadow-md overflow-hidden rounded rounded-lg ring-black ring-1 ring-opacity-5">
			<TwTable
				:headers="headers"
				:items="store.workspaces"
				:row-click="(item) => navigateTo(`/organizations/${orgId}/workspaces/${item.name}`)"
			>
				<template #item-domain="{ item }">
					<a
						class="font-normal text-gray-500 hover:underline hover:text-gray-900"
						:href="`https://${item.subdomain}.${item.domain}`"
						target="_blank"
						@click="(e) => e.stopPropagation()"
					>
						{{ item.subdomain + '.' + item.domain }}
					</a>
				</template>
			</TwTable>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useWorkspacesStore } from '@/stores/workspaces'

const props = defineProps<{
	orgId: string
}>()
const { refreshInterval } = useCollectionPreset('org_details_workspaces')

const store = useWorkspacesStore()
store.getWorkspaces(props.orgId)

const headers = [
	{
		value: 'name',
		text: 'Name',
	},
	{
		value: 'domain',
		text: 'Domain',
	},
	{
		value: 'status',
		text: 'Status',
		display: 'status',
	},
]

const refresh = () => {
	store.getWorkspaces(props.orgId)
}
</script>
