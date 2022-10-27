<template>
	<div>
		<div class="mb-8 flex items-center justify-between">
			<h1 class="font-medium text-2xl">Databases</h1>
			<div class="flex items-center justify-end space-x-2">
				<TwButton @click="navigateTo(`/orgs/${orgId}/databases/new`)">New database</TwButton>
				<DropdownAutoRefresh v-model="refreshInterval" @refresh="refresh" />
			</div>
		</div>
		<div class="bg-white shadow-md overflow-hidden rounded rounded-lg ring-black ring-1 ring-opacity-5">
			<SkeletorTable v-if="isFetching" :headers="headers" />
			<TwTable
				v-else
				:headers="headers"
				:items="store.mysqlInstances"
				:row-click="(item) => navigateTo(`/orgs/${orgId}/databases/${item.name}`)"
			>
				<template #item-storage="{ item }">
					<span>{{ `${item.storageGB} GB` }}</span>
				</template>
				<template #item-instance="{ item }">
					<code>{{ item.instanceClass }}</code>
				</template>
			</TwTable>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useMysqlInstancesStore } from '@/stores/mysql-instances'

const props = defineProps<{
	orgId: string
}>()
const store = useMysqlInstancesStore()
const { refreshInterval } = useCollectionPreset('org_details_databases')

const isFetching = ref(true)
store.getMySQLInstances(props.orgId).finally(() => (isFetching.value = false))

const headers = [
	{
		value: 'name',
		text: 'Name',
	},
	{
		value: 'storage',
		text: 'Storage',
	},
	{
		value: 'instance',
		text: 'Instance',
	},
	{
		value: 'status',
		text: 'Status',
		display: 'status',
	},
	{
		value: 'createdAt',
		text: 'Date created',
		display: 'date',
	},
]

function refresh() {
	store.getMySQLInstances(props.orgId)
}
</script>
