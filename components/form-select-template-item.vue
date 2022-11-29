<script lang="ts" setup>
import { CheckCircleIcon } from '@heroicons/vue/24/solid'
import { Template } from '@/types'

const props = defineProps<{
	item: Template
	modelValue: Template
}>()

const emit = defineEmits(['update:modelValue', 'select', 'deselect'])

const checked = computed(() => props.modelValue.name === props.item.name)

function onInput(value: Template) {
	emit('update:modelValue', value)
}
</script>

<template>
	<label
		:for="item.name"
		:class="[
			checked ? 'ring-2 ring-blue-600' : 'ring-1 ring-gray-300',
			'block relative rounded-lg bg-white p-4 shadow-sm cursor-pointer focus:outline-none',
		]"
	>
		<input :id="item.name" class="sr-only" type="radio" name="template" :value="item.name" @input="onInput(item)" />
		<div class="flex flex-1 items-start justify-between">
			<span class="flex flex-col">
				<h4 class="block text-base font-medium text-gray-900">{{ item.title }}</h4>
				<span v-if="item.description !== ''" class="mt-1 flex items-center text-sm text-gray-500">
					{{ item.description }}
				</span>
			</span>
			<span>
				<CheckCircleIcon :class="['w-5 h-5 text-blue-600', checked ? 'visible' : 'invisible']" />
			</span>
		</div>
	</label>
</template>
