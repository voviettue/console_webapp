<template>
	<component
		:is="component"
		:class="[commonClass, colorClass]"
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
}

const props = withDefaults(defineProps<PropType>(), {
	disabled: false,
	href: '',
	type: 'button',
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
	'inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto'
const colorClass = computed(() => {
	if (props.disabled) return 'bg-gray-500'
	return 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
})

const onClick = (event: MouseEvent) => {
	emit('click', event)
}
</script>
