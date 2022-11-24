<script lang="ts" setup>
import { Workspace } from '@/types'
import { TableHeader } from '@/shared/types'

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
const form = ref({
	app: {
		version: props.item.app.version,
		size: props.item.app.size,
	},
})

async function onSubmit() {
	isUpdating.value = true
	try {
		await $api.patch(`/api/v1alpha1/orgs/${props.item.org}/workspaces/${props.item.name}`, {
			app: { ...form.value.app },
		})
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
				repo="core"
				label="App version"
				help="You cannot revert to older versions"
			/>
			<div class="mt-6 flex justify-end gap-2">
				<TwButton variant="secondary" @click="isEditing = false">Cancel</TwButton>
				<TwButton :loading="isUpdating" :disabled="isUpdating" @click="onSubmit">Update</TwButton>
			</div>
		</template>
		<template v-else>
			<TwList :headers="headers" :item="props.item.app"></TwList>
		</template>
	</TwCard>
</template>
