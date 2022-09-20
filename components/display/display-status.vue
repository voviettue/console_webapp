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
				<span
					class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100"
				>
					{{ status.type }}
				</span>
				<span
					class="-ml-px relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700"
				>
					{{ status.status }}
				</span>
			</span>
		</div>
	</div>
</template>
