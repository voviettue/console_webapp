<template>
	<span>{{ formattedDate }}</span>
</template>

<script setup lang="ts">
import { format, parseISO, isValid } from 'date-fns'
const props = defineProps<{
	value: any
}>()

const formattedDate = computed(() => {
	const date = parseISO(props.value)
	if (!isValid(date)) return props.value
	return format(date, 'MMM dd, yyyy H:m a')
})
</script>
