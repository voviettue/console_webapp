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
const isFetching = ref(true)
store.getImages(props.repo).finally(() => (isFetching.value = false))

function onSelect(value: string) {
	emits('update:modelValue', value)
}
</script>

<template>
	<FormKit
		type="select"
		placeholder="Select a version"
		:disabled="isFetching"
		:options="options"
		v-model="modelValue"
		@input="onSelect"
	/>
</template>
