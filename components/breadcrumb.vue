<template>
	<nav class="flex items-center gap-4" aria-label="Breadcrumb">
		<div v-for="(item, i) in props.items" :key="i" class="flex items-center gap-4">
			<span class="font-bold text-gray-300">/</span>
			<NuxtLink class="font-medium text-base text-gray-900 hover:underline" :to="item.to">{{ item.label }}</NuxtLink>
		</div>
	</nav>
</template>

<script lang="ts" setup>
type BreadcrumbItem = {
	to: string
	label: string
}
type PropType = {
	items: BreadcrumbItem[]
}
const props = defineProps<PropType>()
</script>
