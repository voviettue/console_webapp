<template>
	<div class="flex items-center gap-4">
		<div v-for="i in props.items" :key="i" class="flex items-center gap-4">
			<span class="text-gray-300 font-bold">/</span>
			<Skeletor width="80" />
		</div>
	</div>
</template>

<script lang="ts" setup>
type PropType = {
	items?: number
}
const props = withDefaults(defineProps<PropType>(), {
	items: 1,
})
</script>
