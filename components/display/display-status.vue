<script lang="ts" setup>
import { Status } from '@/types'

const statuses = ref<Status[]>()
const props = defineProps<{
	value: Status[] | Status
}>()
statuses.value = Array.isArray(props.value) ? props.value : [props.value]
</script>

<template>
	<div class="flex space-x-2">
		<div v-for="(status, index) in statuses" :key="index">
			<span class="isolate inline-flex rounded-md">
				<Badge :variant="status.status === 'True' ? 'success' : 'secondary'">
					{{ `${status.type}: ` }}
					<span class="font-semibold">{{ status.status }}</span>
				</Badge>
			</span>
		</div>
	</div>
</template>
