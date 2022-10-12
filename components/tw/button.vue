<template>
	<component
		:is="component"
		:class="[commonClass, sizeClass, variantClass]"
		:type="props.type"
		:disabled="props.disabled"
		v-bind="additionalProps"
		@click="onClick"
	>
		<slot name="prepend-outer"></slot>
		<span>
			<slot></slot>
		</span>
		<slot name="append-outer"></slot>
	</component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type PropType = {
	disabled?: boolean
	href?: string
	type?: string
	variant?: 'primary | secondary | soft-primary'
	size?: 'xs | sm | md | lg'
}

const props = withDefaults(defineProps<PropType>(), {
	disabled: false,
	href: '',
	type: 'button',
	variant: 'primary',
	size: 'md',
})

const emit = defineEmits(['click'])

const component = computed(() => {
	if (props.disabled) return 'button'
	if (props.href !== '') return 'a'
	return 'button'
})

const additionalProps = computed(() => {
	if (component.value === 'a') {
		return {
			href: props.href,
			rel: 'noopener noreferrer',
		}
	}

	return {}
})

const commonClass =
	'inline-flex items-center justify-center rounded-md border font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto'
const variantClass = computed(() => {
	if (props.disabled) return 'bg-gray-500 text-white'
	if (props.variant === 'secondary')
		return 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-gray-500'
	if (props.variant === 'success')
		return 'bg-green-600 text-white border-green-600 hover:bg-green-700 focus:ring-green-500'
	if (props.variant === 'soft-primary')
		return 'bg-indigo-100 text-indigo-700 border-transparent hover:bg-indigo-200 focus:ring-indigo-500'
	if (props.variant === 'soft-danger')
		return 'bg-red-100 text-red-700 border-transparent hover:bg-red-200 focus:ring-red-500'
	if (props.variant === 'soft-success')
		return 'bg-green-100 text-green-700 border-transparent hover:bg-green-200 focus:ring-green-500'
	return 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
})
const sizeClass = computed(() => {
	if (props.size === 'xs') return 'px-2.5 py-1.5 text-xs'
	if (props.size === 'sm') return 'px-3 py-2 text-sm leading-4'
	if (props.size === 'lg') return 'px-4 py-2 text-base'
	return 'text-sm px-4 py-2 '
})

const onClick = (event: MouseEvent) => {
	emit('click', event)
}
</script>
