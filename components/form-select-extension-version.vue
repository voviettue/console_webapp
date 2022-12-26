<script lang="ts" setup>
const props = defineProps<{
	name: string
	modelValue: string
}>()
const emit = defineEmits(['update:modelValue'])
const { $api } = useNuxtApp()
const versions = ref([])
const options = computed(() => {
	return versions.value.map((e: any) => {
		return {
			label: e.version,
			value: e.version,
		}
	})
})
const isFetching = ref(true)
$api
	.get(`/api/meta/extensions/${props.name}/versions`)
	.then((res) => {
		versions.value = res.data.data
	})
	.finally(() => (isFetching.value = false))

function onSelect(value: string) {
	emit('update:modelValue', value)
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
