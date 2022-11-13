<script lang="ts" setup>
import { Category } from '@/types'

const props = defineProps<{
	type: string
	modelValue: string
}>()
const emit = defineEmits(['update:modelValue'])
const { $api } = useNuxtApp()

const localValue = ref(props.modelValue)
const categories = ref<Category[]>([])
const options = computed(() => {
	const options = categories.value.map((item) => {
		return {
			label: item.title,
			value: item.name,
		}
	})
	options.unshift({ label: 'Uncategorized', value: 'uncategorized' })
	return options
})

watch(
	() => props.modelValue,
	(newVal) => {
		localValue.value = newVal
	}
)

getCategories()

async function getCategories() {
	const res = await $api.get(`/api/meta/${props.type}-categories`)
	categories.value = res.data.data
}

function onSelect(value: string) {
	emit('update:modelValue', value)
}
</script>

<template>
	<FormKit
		type="select"
		label="Category"
		placeholder="Select a category"
		:value="localValue"
		:options="options"
		@input="onSelect"
	/>
</template>
