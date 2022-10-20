<template>
	<div>
		<div class="mb-8">
			<ButtonBack :to="`/orgs/${orgId}/marketplace`" text="Marketplace" />
		</div>
		<TwCard class="py-8">
			<div v-if="extension" class="max-w-lg mx-auto">
				<div class="mb-8">
					<h1 class="mb-2 font-medium text-2xl">{{ `Install ${extension.title} extension` }}</h1>
					<p class="text-base text-gray-500">{{ extension.description }}</p>
				</div>
				<div>
					<h2 class="mb-4 font-medium text-xl">{{ `Where do you want to install ${extension.title} extension?` }}</h2>
					<div class="mb-4">
						<FormKit v-model="searchText" type="text" placeholder="Search workspaces" />
					</div>
					<ul v-if="wsStore.workspaces.length" class="space-y-1">
						<li
							v-for="ws in filteredWorkspaces"
							:key="ws.name"
							class="p-4 -mx-4 cursor-pointer rounded-lg hover:bg-gray-100"
							@click="openInstallationModal(extension, ws)"
						>
							<h3 class="font-semibold text-base">{{ ws.name }}</h3>
							<a
								:href="`https://${ws.subdomain}.catex.se`"
								target="_blank"
								class="inline-flex items-center gap-2 text-gray-500 hover:underline hover:text-gray-900"
							>
								{{ `${ws.subdomain}.catex.se` }}
								<ArrowTopRightOnSquareIcon class="w-4 h-4" />
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div v-else class="max-w-lg mx-auto">
				<div class="flex flex-col">
					<Skeletor width="60%" class="mb-2" />
					<Skeletor width="100%" class="mb-1" />
					<Skeletor width="80%" class="mb-8" />
					<Skeletor width="60%" class="mb-4" />
					<div v-for="i in 5" :key="i" class="flex flex-col mb-4">
						<Skeletor width="100" class="mb-2" />
						<Skeletor width="40%" class="mb-2" />
					</div>
				</div>
			</div>
		</TwCard>

		<Teleport to="body">
			<Modal :open="openModal" @close="onCloseModal">
				<template #title>{{ `Install extension on ${modalData.ws.name}` }}</template>
				<template #content>
					<div class="space-y-2">
						<p>
							Are you sure you want to install
							<strong>{{ modalData.extension.title }}</strong>
							on
							<strong>{{ modalData.ws.name }}</strong>
							?
						</p>
					</div>
				</template>
				<template #actions="{ close }">
					<TwButton variant="secondary" @click="close">Cancel</TwButton>
					<TwButton>Install</TwButton>
				</template>
			</Modal>
		</Teleport>
	</div>
</template>

<script lang="ts" setup>
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
import { useExtensionsStore } from '@/stores/extensions'
import { useWorkspacesStore } from '@/stores/workspaces'

const store = useExtensionsStore()
const wsStore = useWorkspacesStore()
const route = useRoute()
const id = route.params.id as string
const orgId = route.params.orgid as string
const extension = ref()
const searchText = ref('')
const openModal = ref(false)
const modalData = ref()
store.getExtension(id).then((res) => {
	extension.value = res
})
wsStore.getWorkspaces(orgId)

const filteredWorkspaces = computed(() => {
	const q = searchText.value.trim()
	if (q === '') return wsStore.workspaces

	return wsStore.workspaces.filter((ws) => {
		return ws.name.includes(q)
	})
})

function onCloseModal() {
	openModal.value = false
}

function openInstallationModal(extension: any, ws: any) {
	openModal.value = true
	modalData.value = { extension, ws }
}
</script>
