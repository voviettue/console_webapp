<template>
	<TwTable
		:headers="headers"
		:items="store.workspaces"
		:row-click="(item) => navigateTo(`/organizations/${orgId}/workspaces/${item.name}`)"
	>
		<template #item-domain="{ item }">{{ item.subdomain + '.' + item.domain }}</template>
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
		value: 'subdomain',
		text: 'Domain',
	},
	{
		value: 'status',
		text: 'Status',
		display: 'status',
	},
]
</script>
