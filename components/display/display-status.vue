<script lang="ts" setup>
import { Status } from '@/types'

const statuses = ref<Status[]>()
const props = defineProps<{
	value: Status[] | Status
}>()
statuses.value = Array.isArray(props.value) ? props.value : [props.value]
</script>

<template>
	<div class="flex space-x-4">
		<div v-for="(status, index) in statuses" :key="index">
			<span class="flex gap-2 items-center">
				<div :class="[status.status === 'True' ? 'bg-green-300' : 'bg-gray-300', 'w-2.5 h-2.5 rounded-full']"></div>
				<span>{{ status.type }}</span>
			</span>
		</div>
	</div>
</template>
