<script lang="ts" setup>
import { Workspace } from '@/types'
import { capitalize } from '@/shared/utils/str'

const { $api, $toast } = useNuxtApp()

const props = defineProps<{
	item: Workspace
}>()

const deletedWorkspaceName = ref('')
const openDeletionModal = ref(false)
const isDeletingWorkspace = ref(false)

function onCloseModal() {
	openDeletionModal.value = false
	deletedWorkspaceName.value = ''
}

async function deleteWorkspace() {
	if (isDeletingWorkspace.value) return
	isDeletingWorkspace.value = true
	try {
		await $api.delete(`/api/v1alpha1/orgs/${props.item.org}/workspaces/${props.item.name}`)
		navigateTo(`/orgs/${props.item.org}/overview`)
	} catch (err) {
		let msg = ''
		if (err.response.status === 422) {
			msg = capitalize(err.response.data.errors[0].message)
		}
		$toast.error({ title: 'Cannot delete this workspace', content: msg })
	}
	isDeletingWorkspace.value = false
}
</script>
<template>
	<TwCard class="border border-red-300">
		<h3 class="mb-5 font-semibold">Delete workspace</h3>
		<p class="mb-5">This workspace will be permanently deleted. This action cannot be undone.</p>
		<TwButton variant="danger" @click="openDeletionModal = true">Delete this workspace</TwButton>
	</TwCard>
	<Teleport to="body">
		<Modal :open="openDeletionModal" @close="onCloseModal">
			<template #title>Delete workspace</template>
			<div class="space-y-2">
				<p>
					Are you absolutely sure you want to delete
					<strong class="font-bold">{{ props.item.name }}</strong>
					?
				</p>
				<p><strong>This action cannot be undone</strong></p>
				<FormKit v-model="deletedWorkspaceName" placeholder="Type in the name of the workspace to confirm" />
				<code>{{ props.item.name }}</code>
			</div>
			<template #actions="{ close }">
				<TwButton variant="secondary" @click="close">Cancel</TwButton>
				<TwButton
					variant="danger"
					:disabled="deletedWorkspaceName !== props.item.name"
					:loading="isDeletingWorkspace"
					@click="deleteWorkspace"
				>
					Delete
				</TwButton>
			</template>
		</Modal>
	</Teleport>
</template>
