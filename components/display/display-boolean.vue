<template>
	<span v-if="value === null || value === undefined"></span>
	<CheckCircleIcon v-else-if="value === true" class="text-green-600 h-5 w-5" aria-label="True" />
	<XCircleIcon v-else class="text-red-600 h-5 w-5" aria-label="False" />
</template>

<script setup lang="ts">
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline'

interface Props {
	value: any
}
defineProps<Props>()
</script>
