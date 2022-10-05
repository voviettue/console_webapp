<template>
	<FormKit type="select" :options="options" />
</template>

<script lang="ts" setup>
import { useMysqlInstancesStore } from '@/stores/mysql-instances'
import { MySQLInstance } from '@/types'

const props = defineProps<{
	orgId: string
}>()

const store = useMysqlInstancesStore()
const options = ref<Record<string, string>>({})

await store.getMySQLInstances(props.orgId)
store.mysqlInstances.forEach((mysql: MySQLInstance) => {
	options.value[mysql.name] = mysql.name
})
</script>
