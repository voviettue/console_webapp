<template>
	<FormKit type="select" :options="options" />
</template>

<script lang="ts" setup>
import { useMysqlInstancesStore } from '@/stores/mysql-instances'
import { MySQLInstance } from '@/types'

const props = defineProps<{
	org: string
}>()

const store = useMysqlInstancesStore()
const options = ref<Record<string, string>>({})

await store.getMySQLInstances(props.org)
store.mysqlInstances.forEach((mysql: MySQLInstance) => {
	options.value[mysql.name] = mysql.name
})
</script>
