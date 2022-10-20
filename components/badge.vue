<script lang="ts" setup>
const props = withDefaults(
	defineProps<{
		variant?: 'primary' | 'secondary' | 'success' | 'danger'
	}>(),
	{
		variant: 'primary',
	}
)

const commonClass = 'inline-flex items-center rounded-md px-2.5 py-0.5 text-sm'
const variantClass = computed(() => {
	if (props.variant === 'secondary') return 'bg-gray-200 text-gray-700'
	if (props.variant === 'success') return 'bg-green-100 text-green-800'
	if (props.variant === 'danger') return 'bg-red-100 text-red-800'
	return 'bg-indigo-100 text-indigo-800'
})
</script>

<template>
	<span :class="[commonClass, variantClass]">
		<slot></slot>
	</span>
</template>
