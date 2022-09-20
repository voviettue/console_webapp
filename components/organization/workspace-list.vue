<template>
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
</template>

<script setup lang="ts">
import { useWorkspacesStore } from '@/stores/workspaces'

const props = defineProps<{
	orgId: string
}>()

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
</script>
