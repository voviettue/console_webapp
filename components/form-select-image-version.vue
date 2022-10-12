<script lang="ts" setup>
import gt from 'semver/functions/gt'
import lt from 'semver/functions/lt'
import valid from 'semver/functions/valid'

type PropType = {
	repo: string
	modelValue: string
}
const props = defineProps<PropType>()
const emit = defineEmits(['update:modelValue'])
const { $api } = useNuxtApp()
const versions = ref([])
const isFetchingVersion = ref(true)
$api
	.get(`/api/meta/images/${props.repo}`)
	.then((res) => {
		versions.value = res.data.data
			.sort((a, b) => {
				if (!valid(a.imageTag) || !valid(b.imageTag)) return 0
				if (gt(a.imageTag, b.imageTag)) return -1
				if (lt(a.imageTag, b.imageTag)) return 1
				return 0
			})
			.map((e: any) => {
				return {
					label: e.imageTag,
					value: e.imageTag,
				}
			})
	})
	.catch((err) => {
		throw new Error(String(err))
	})
	.finally(() => (isFetchingVersion.value = false))

function onSelect(version) {
	emit('update:modelValue', version)
}
</script>

<template>
	<FormKit
		type="select"
		placeholder="Select a version"
		:options="versions"
		:value="modelValue"
		:disabled="isFetchingVersion"
		@input="onSelect"
	/>
</template>
