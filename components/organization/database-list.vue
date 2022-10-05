<template>
	<div>
		<div class="mb-4 flex items-center justify-end space-x-2">
			<TwButton>New database</TwButton>
			<DropdownAutoRefresh v-model="refreshInterval" @refresh="refresh" />
		</div>
		<div class="bg-white shadow-md overflow-hidden rounded rounded-lg ring-black ring-1 ring-opacity-5">
			<SkeletorTable v-if="isFetchingMySQLInstances" :headers="headers" />
			<TwTable v-else :headers="headers" :items="store.mysqlInstances"></TwTable>
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

const isFetchingMySQLInstances = ref(true)
store.getMySQLInstances(props.orgId).finally(() => (isFetchingMySQLInstances.value = false))

const headers = [
	{
		value: 'name',
		text: 'Name',
	},
	{
		value: 'status',
		text: 'Status',
		display: 'status',
	},
]

const refresh = () => {
	store.getMySQLInstances(props.orgId)
}
</script>
