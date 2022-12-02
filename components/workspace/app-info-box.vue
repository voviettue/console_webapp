<script lang="ts" setup>
import { Workspace } from '@/types'
import { TableHeader } from '@/shared/types'
import { parseWorkspace } from '@/stores/workspaces'

const { $api, $toast } = useNuxtApp()

const props = defineProps<{
	item: Workspace
}>()

const headers: TableHeader[] = [
	{ value: 'adminEmail', text: 'Admin email' },
	{ value: 'chartVersion', text: 'Chart version' },
	{ value: 'version', text: 'App version' },
	{ value: 'size', text: 'Scale' },
]
const isEditing = ref(false)
const isUpdating = ref(false)
const ws = ref<Workspace>(props.item)
const form = ref({
	app: {
		version: ws.value.app.version,
		size: ws.value.app.size,
	},
})

watch(isEditing, (newVal) => {
	if (!newVal) {
		form.value.app = {
			version: ws.value.app.version,
			size: ws.value.app.size,
		}
	}
})

async function onSubmit() {
	isUpdating.value = true
	try {
		const res = await $api.patch(`/api/v1alpha1/orgs/${ws.value.org}/workspaces/${ws.value.name}`, {
			app: { ...form.value.app },
		})
		ws.value = parseWorkspace(res.data.data)
		isEditing.value = false
		$toast.success({ title: 'App information updated' })
	} catch (err) {
		$toast.error({ title: 'Error' })
	}
	isUpdating.value = false
}
</script>
<template>
	<TwCard>
		<div class="mb-5 flex items-center justify-between">
			<h3 class="font-semibold">App information</h3>
			<TwButton v-if="!isEditing" variant="secondary" size="sm" @click="isEditing = true">Edit</TwButton>
		</div>

		<template v-if="isEditing">
			<span class="text-sm text-gray-500">Choose the scale</span>
			<FormSlider v-model="form.app.size" :min="1" :max="5" />
			<FormSelectImageVersion
				v-model="form.app.version"
				repo="gigapress/core"
				label="App version"
				help="You cannot revert to older versions"
			/>
			<div class="mt-6 flex justify-end gap-3">
				<TwButton :loading="isUpdating" :disabled="isUpdating" @click="onSubmit">Update</TwButton>
				<TwButton variant="secondary" @click="isEditing = false">Cancel</TwButton>
			</div>
		</template>
		<template v-else>
			<TwList :headers="headers" :item="ws.app"></TwList>
		</template>
	</TwCard>
</template>
