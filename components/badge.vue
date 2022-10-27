<script lang="ts" setup>
const props = withDefaults(
	defineProps<{
		variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
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
	if (props.variant === 'warning') return 'bg-orange-100 text-orange-800'
	return 'bg-blue-100 text-blue-800'
})
</script>

<template>
	<span :class="[commonClass, variantClass]">
		<slot></slot>
	</span>
</template>
