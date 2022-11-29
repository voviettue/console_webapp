<template>
	<PageWrapper>
		<div class="mb-8 flex justify-between item-center">
			<ButtonBack :to="`/admin/templates`" text="Templates" />
			<div class="flex gap-2">
				<TwButton v-tooltip="'Sync'" variant="soft-primary" size="xs" icon :loading="isSynchronizing" @click="onSync">
					<ArrowPathIcon v-if="!isSynchronizing" class="w-5 h-5" />
				</TwButton>
				<TwButton v-tooltip="'Delete'" variant="soft-danger" size="xs" icon @click="openDeletionModal = true">
					<TrashIcon class="w-5 h-5" />
				</TwButton>
			</div>
		</div>
		<div class="mb-6 md:grid md:grid-cols-[1fr_400px] md:gap-6">
			<TwCard class="mb-6 md:mb-0">
				<FormKit
					v-slot="{ state: { valid } }"
					type="form"
					autocomplete="off"
					method="POST"
					:actions="false"
					@submit="onSubmit"
				>
					<div class="space-y-3">
						<FormKit v-model="form.title" label="Title" type="text" placeholder="" validation="required" />
						<FormKit v-model="form.description" label="Description" type="textarea" validation="required" />
						<FormKit v-model="form.public" type="checkbox" label="Public" />
					</div>
					<div class="flex gap-2 justify-end my-6">
						<TwButton type="submit" :disabled="!valid || isUpdating" :loading="isUpdating">Update</TwButton>
						<TwButton variant="secondary" @click="navigateTo(`/admin/templates`)">Cancel</TwButton>
					</div>
				</FormKit>
			</TwCard>
			<TwCard>
				<div>
					<dl class="mb-4">
						<dt class="text-gray-500">Workspace</dt>
						<dd>
							<NuxtLink class="link">{{ `${template.org}/${template.workspace}` }}</NuxtLink>
						</dd>
					</dl>
					<dl>
						<dt class="text-gray-500">Last modified</dt>
						<dd>
							<DisplayDate :value="template.updatedAt" />
						</dd>
					</dl>
				</div>
				<Divider class="my-4" />
				<FormSelectCategory v-model="template.category" type="tpl" @input="onSelectCategory" />
			</TwCard>
		</div>
		<div>
			<TwCard :body-padding="false">
				<TemplateFileList :item="template" />
			</TwCard>
		</div>
		<Teleport to="body">
			<Modal :open="openDeletionModal" @close="onCloseModal">
				<template #title>Delete template</template>
				<div class="space-y-2">
					<p>Are you absolutely sure you want to delete?</p>
				</div>
				<template #actions="{ close }">
					<TwButton variant="secondary" @click="close">Cancel</TwButton>
					<TwButton variant="danger" :loading="isDeleting" @click="deleteExtension">Delete</TwButton>
				</template>
			</Modal>
		</Teleport>
	</PageWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TrashIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
import { useTemplatesStore } from '@/stores/templates'
import { Template } from '@/types'

definePageMeta({
	title: 'Update template',
	middleware: ['auth'],
})

const { $api, $toast } = useNuxtApp()
const route = useRoute()
const store = useTemplatesStore()
const id = route.params.id as string
const template = ref<Template>()
const form = ref<{
	title: string
	description: string
	public: boolean
}>({
	title: '',
	description: '',
	public: false,
})
const isSynchronizing = ref(false)
const isUpdating = ref(false)
const isDeleting = ref(false)
const openDeletionModal = ref(false)

await getTemplate(id)

async function onSubmit() {
	if (isUpdating.value) return
	isUpdating.value = true
	try {
		await $api.put(`/api/meta/templates/${id}/metadata`, form.value)
		$toast.success({ title: 'Template has been updated successfully!' })
	} catch (err) {
		$toast.error({ title: 'Cannot update template', content: JSON.stringify(err.response.data) })
	}
	isUpdating.value = false
}

async function onSync() {
	isSynchronizing.value = true
	try {
		await $api.put(`/api/meta/templates/${id}/sync`, form.value)
		$toast.success({ title: 'Template has been synced successfully!' })
	} catch (err) {
		$toast.error({ title: 'Cannot synced template', content: JSON.stringify(err.response.data) })
	}
	isSynchronizing.value = false
}

async function getTemplate(id) {
	const res = await store.getTemplate(id)
	template.value = res
	form.value = {
		title: res.title,
		description: res.description,
		public: res.public,
	}
}

function onCloseModal() {
	openDeletionModal.value = false
}

async function onSelectCategory(value) {
	try {
		await $api.put(`/api/meta/templates/${id}/categories`, { category: value })
		$toast.success({ title: 'Category updated' })
	} catch (error) {
		$toast.error({ title: 'Cannot update category' })
	}
}

async function deleteExtension() {
	isDeleting.value = true
	try {
		await $api.delete(`/api/meta/templates/${id}`)
		await $api.patch(`/api/v1alpha1/orgs/${template.value.org}/workspaces/${template.value.workspace}`, {
			publishTpl: {
				name: template.value.name,
				enabled: false,
			},
		})
		openDeletionModal.value = false
		navigateTo(`/admin/templates`)
	} catch (err) {}
	isDeleting.value = false
}
</script>
