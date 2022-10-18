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
				<Badge class="gap-1" :variant="status.status === 'True' ? 'success' : 'secondary'">
					<span class="font-light">{{ `${status.type}:` }}</span>
					<span class="font-semibold">{{ status.status }}</span>
				</Badge>
			</span>
		</div>
	</div>
</template>
