<script lang="ts" setup>
import { Template } from '@/types'
import { parseTemplate } from '@/stores/templates'

const props = defineProps<{
	modelValue: Template
}>()

const emit = defineEmits(['update:modelValue'])
const { $api } = useNuxtApp()
const templates = ref<Template[]>([])
const selected = ref<Template>(props.modelValue)
const isFetching = ref(true)

$api
	.get(`/api/meta/templates`)
	.then((res) => {
		templates.value = res.data.data.map(parseTemplate)
		selected.value = templates.value[0]
		emit('update:modelValue', selected.value)
	})
	.finally(() => (isFetching.value = false))

function onUpdate(value: Template) {
	selected.value = value
	emit('update:modelValue', selected.value)
}
</script>
<template>
	<div class="grid grid-cols-2 gap-4">
		<template v-if="isFetching">
			<div v-for="i in 2" :key="i" class="ring-1 ring-gray-300 bg-white rounded-lg p-4 shadow-sm">
				<Skeletor width="100px" />
				<Skeletor width="100%" />
				<Skeletor width="80%" />
			</div>
		</template>
		<template v-else>
			<FormSelectTemplateItem
				v-for="template in templates"
				:key="template.name"
				:item="template"
				:model-value="selected"
				@update:model-value="onUpdate"
			/>
		</template>
	</div>
</template>
