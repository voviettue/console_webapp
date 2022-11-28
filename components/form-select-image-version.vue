<script lang="ts" setup>
import { useImagesStore } from '@/stores/images'

const props = defineProps<{
	repo: string
	modelValue: string
}>()
const emits = defineEmits(['update:modelValue'])
const store = useImagesStore()
const options = computed(() => {
	if (!store.images[props.repo]) return []
	return store.images[props.repo].map((e: any) => {
		return {
			label: e.tag,
			value: e.tag,
		}
	})
})
store.getImages(props.repo)

function onSelect(value: string) {
	emits('update:modelValue', value)
}
</script>

<template>
	<FormKit type="select" placeholder="Select a version" :options="options" :value="modelValue" @input="onSelect" />
</template>
