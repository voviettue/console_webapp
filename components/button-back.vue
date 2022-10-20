<template>
	<NuxtLink :to="props.to" class="flex gap-2 text-gray-500 hover:underline hover:text-gray-900">
		<ArrowLongLeftIcon class="w-5" />
		{{ props.text }}
	</NuxtLink>
</template>

<script lang="ts" setup>
import { ArrowLongLeftIcon } from '@heroicons/vue/24/outline'

type PropType = {
	to: string
	text: string
}

const props = defineProps<PropType>()
</script>
