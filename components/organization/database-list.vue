<template>
	<TwTable :headers="headers" :items="store.mysqlInstances"></TwTable>
</template>

<script setup lang="ts">
import { useMysqlInstancesStore } from '@/stores/mysql-instances'

const props = defineProps<{
	orgId: string
}>()

const store = useMysqlInstancesStore()
store.getMySQLInstances(props.orgId)

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
</script>
