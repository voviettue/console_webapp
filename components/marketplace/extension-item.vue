<template>
	<dl>
		<NuxtLink :to="props.to" class="block h-full text-gray-900 p-5 rounded-lg shadow border">
			<dt class="flex gap-3 items-center mb-5">
				<div :style="`background-image:url(${props.extension.image});`" class="w-12 h-12 rounded-full bg-cover"></div>
				<div class="text-lg font-medium">{{ props.extension.title }}</div>
			</dt>
			<dd>{{ props.extension.description }}</dd>
		</NuxtLink>
	</dl>
</template>

<script lang="ts" setup>
const props = defineProps<{
	extension: Record<string, unknown> // @TODO: using Extension type
	to: string
}>()
</script>
