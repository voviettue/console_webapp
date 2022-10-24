<template>
	<PageWrapper>
		<div class="mb-8">
			<ButtonBack :to="`/admin/extensions`" text="Extensions" />
		</div>
		<div class="md:grid md:grid-cols-[1fr_400px] md:gap-6">
			<TwCard class="mb-6 md:mb-0">
				<template v-if="extension">
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
						</div>
						<div class="flex justify-end my-6">
							<TwButton type="submit" :disabled="!valid" :loading="isUpdating">Update</TwButton>
						</div>
					</FormKit>
				</template>
				<template v-else>
					<div class="flex flex-col">
						<Skeletor width="300" class="mb-6" />
						<Skeletor width="100" class="mb-2" />
						<Skeletor width="100%" height="38" class="rounded-lg mb-4" />
						<Skeletor width="100" class="mb-2" />
						<Skeletor width="100%" height="100" class="rounded-lg mb-4" />
						<Skeletor width="100" class="mb-2" />
						<Skeletor width="100%" height="38" class="rounded-lg mb-4" />
						<div class="flex justify-end">
							<Skeletor width="100" height="38" class="rounded-lg" />
						</div>
					</div>
				</template>
			</TwCard>
			<TwCard>
				<template v-if="extension">
					<h2 class="mb-6 font-medium text-xl">Synchronize with CodeActifact</h2>
					<div class="flex gap-6 mb-4">
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
					</div>
					<div class="mb-4">
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
								<div v-for="version in extension.versions" :key="version.version">
									<code>{{ version.version }}</code>
								</div>
							</dd>
						</dl>
					</div>
					<div class="flex justify-end my-6">
						<TwButton variant="soft-primary" :loading="isSynchronizing" @click="onSync">Sync</TwButton>
					</div>
				</template>
				<template v-else>
					<div class="flex flex-col">
						<Skeletor width="100%" class="mb-6" />
						<div class="flex gap-6 mb-4">
							<div class="flex flex-col">
								<Skeletor width="60" class="mb-1" />
								<Skeletor width="100" />
							</div>
							<div class="flex flex-col">
								<Skeletor width="60" class="mb-1" />
								<Skeletor width="100" />
							</div>
						</div>
						<div class="flex flex-col mb-4">
							<Skeletor width="60" class="mb-1" />
							<Skeletor width="100" />
						</div>
						<Skeletor width="60" class="mb-2" />
						<Skeletor width="100%" height="100" class="rounded-lg mb-4" />
						<div class="flex justify-end">
							<Skeletor width="100" height="38" class="rounded-lg" />
						</div>
					</div>
				</template>
			</TwCard>
		</div>
	</PageWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useExtensionsStore } from '@/stores/extensions'
import { Extension } from '@/types'

interface ExtensionPayload {
	title: string
	description: string
	image: string
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
const form = ref<ExtensionPayload>({
	title: '',
	description: '',
	image: '',
})
const isSynchronizing = ref(false)
const isUpdating = ref(false)

getExtension(id)

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

function getExtension(id) {
	store.getExtension(id).then((res) => {
		extension.value = res
		form.value = { ...res }
	})
}
</script>