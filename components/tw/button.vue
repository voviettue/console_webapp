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
		<span class="flex items-center">
			<svg
				v-if="loading"
				aria-hidden="true"
				class="mr-2 w-5 h-5 animate-spin fill-white"
				viewBox="0 0 100 101"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
					fill="currentColor"
					class="opacity-50"
				/>
				<path
					d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
					fill="currentFill"
				/>
			</svg>
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
	variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'soft-primary' | 'soft-success' | 'soft-danger'
	size?: 'xs' | 'sm' | 'md' | 'lg'
	loading?: boolean
}

const props = withDefaults(defineProps<PropType>(), {
	disabled: false,
	href: '',
	type: 'button',
	variant: 'primary',
	size: 'md',
	loading: false,
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
	if (props.disabled) return 'bg-gray-400 text-white cursor-not-allowed'
	if (props.variant === 'secondary')
		return 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-gray-500'
	if (props.variant === 'success')
		return 'bg-green-600 text-white border-green-600 hover:bg-green-700 focus:ring-green-500'
	if (props.variant === 'danger') return 'bg-red-600 text-white border-red-600 hover:bg-red-700 focus:ring-red-500'
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
