<script lang="ts" setup>
import { Template } from '@/types'
import { TableHeader } from '@/shared/types' // @TODO: move to @/types

const { $api } = useNuxtApp()
const props = defineProps<{
	item: Template
}>()
const files = ref([]) // @TODO: add interface TemplateFile
const headers: TableHeader[] = [
	{
		value: 'name',
		text: 'Name',
	},
	{
		value: 'size',
		text: 'Size',
		display: 'file-size',
	},
	{
		value: 'modifiedAt',
		text: 'Date Modifed',
		display: 'date',
	},
]
const isFetchingFiles = ref(true)
getTemplateFiles().then(() => {
	isFetchingFiles.value = false
})

async function getTemplateFiles() {
	const res = await $api.get(`/api/meta/templates/${props.item.name}/files`)
	files.value = res.data.data
}
</script>

<template>
	<SkeletorTable v-if="isFetchingFiles" :headers="headers" />
	<template v-else>
		<div class="py-4 px-6">
			<h4 class="text-base">Files ({{ files.length }})</h4>
		</div>
		<TwTable :items="files" :headers="headers">
			<template #item-name="{ item }">
				<span class="text-blue-600 cursor-pointer hover:underline">
					{{ item.name.replace(`${item.template}/`, '') }}
				</span>
			</template>
		</TwTable>
	</template>
</template>
