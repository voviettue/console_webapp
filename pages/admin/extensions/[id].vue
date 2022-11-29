<template>
	<PageWrapper>
		<div class="mb-8 flex justify-between item-center">
			<ButtonBack :to="`/admin/extensions`" text="Extensions" />
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
				<h1 class="mb-6 font-medium text-2xl">Update {{ extension.title }} extension</h1>
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
						<FormKit
							v-model="form.description"
							label="Description"
							type="textarea"
							placeholder=""
							validation="required"
						/>
						<FormKit v-model="form.image" label="Image" type="text" placeholder="" validation="required" />
						<FormKit v-model="form.public" type="checkbox" label="Public" />
					</div>
					<div class="flex gap-2 justify-end my-6">
						<TwButton type="submit" :disabled="!valid || isUpdating" :loading="isUpdating">Update</TwButton>
						<TwButton variant="secondary" @click="navigateTo(`/admin/extensions`)">Cancel</TwButton>
					</div>
				</FormKit>
			</TwCard>
			<div>
				<TwCard class="mb-6">
					<div>
						<dl>
							<dt class="text-gray-500">Last modified</dt>
							<dd>
								<DisplayDate :value="extension.updatedAt" />
							</dd>
						</dl>
					</div>
					<Divider class="my-4" />
					<FormSelectCategory v-model="extension.category" type="ext" @input="onSelectCategory" />
				</TwCard>
				<TwCard>
					<h2 class="mb-6 font-medium text-xl">CodeActifact</h2>
					<div class="flex gap-8 mb-4">
						<dl>
							<dt class="uppercase text-xs text-gray-500">Namespace</dt>
							<dd>
								{{ extension.namespace }}
							</dd>
						</dl>
						<dl>
							<dt class="uppercase text-xs text-gray-500">Package</dt>
							<dd>
								{{ extension.package }}
							</dd>
						</dl>
						<dl>
							<dt class="uppercase text-xs text-gray-500">Synced</dt>
							<dd>
								<DisplayDate :value="extension.syncedAt" />
							</dd>
						</dl>
					</div>
					<div class="mb-6">
						<dl>
							<dt class="uppercase text-xs text-gray-500 mb-1">Versions</dt>
							<dd>
								<div v-for="version in versions" :key="version.version">
									<code>{{ version.version }}</code>
								</div>
							</dd>
						</dl>
					</div>
				</TwCard>
			</div>
		</div>
		<Teleport to="body">
			<Modal :open="openDeletionModal" @close="onCloseModal">
				<template #title>Delete extension</template>
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
import { useExtensionsStore } from '@/stores/extensions'
import { Extension } from '@/types'

interface ExtensionPayload {
	title: string
	description: string
	image: string
	public: boolean
}

definePageMeta({
	title: 'Update extension',
	middleware: ['auth'],
})

const { $api, $toast } = useNuxtApp()
const route = useRoute()
const store = useExtensionsStore()
const id = route.params.id as string
const extension = ref<Extension>()
const versions = ref([])
const form = ref<ExtensionPayload>({
	title: '',
	description: '',
	image: '',
	public: false,
})
const isSynchronizing = ref(false)
const isUpdating = ref(false)
const isDeleting = ref(false)
const openDeletionModal = ref(false)

await getExtension(id)
await getVersions(id)

async function onSubmit() {
	if (isUpdating.value) return
	isUpdating.value = true
	try {
		await $api.put(`/api/meta/extensions/${id}/metadata`, form.value)
		$toast.success({ title: 'Extension has been updated successfully!' })
		getExtension(id)
	} catch (err) {
		$toast.error({ title: 'Cannot update extension', content: JSON.stringify(err.response.data) })
	}
	isUpdating.value = false
}

async function onSync() {
	isSynchronizing.value = true
	try {
		await $api.put(`/api/meta/extensions/${id}/sync`, form.value)
		$toast.success({ title: 'Extension has been synced successfully!' })
		getExtension(id)
	} catch (err) {
		$toast.error({ title: 'Cannot synced extension', content: JSON.stringify(err.response.data) })
	}
	isSynchronizing.value = false
}

async function getExtension(id) {
	const res = await store.getExtension(id)
	extension.value = res
	form.value = {
		title: res.title,
		description: res.description,
		image: res.image,
		public: res.public,
	}
}

async function getVersions(id) {
	const res = await $api.get(`/api/meta/extensions/${id}/versions`)
	versions.value = res.data.data
}

function onCloseModal() {
	openDeletionModal.value = false
}

async function deleteExtension() {
	isDeleting.value = true
	try {
		await $api.delete(`/api/meta/extensions/${id}`)
		openDeletionModal.value = false
		navigateTo(`/admin/extensions`)
	} catch (err) {}
	isDeleting.value = false
}

async function onSelectCategory(value) {
	try {
		await $api.put(`/api/meta/extensions/${id}/categories`, { category: value })
		$toast.success({ title: 'Category updated' })
	} catch (error) {
		$toast.error({ title: 'Cannot update category' })
	}
}
</script>
