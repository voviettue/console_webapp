<template>
	<PageWrapper>
		<template #title:prepend>
			<button
				class="mr-2 p-2 inline-flex items-center rounded-full border border-transparent bg-indigo-100 p-1 text-indigo-700 shadow-sm hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				@click="router.back()"
			>
				<ArrowLeftIcon class="w-4 h-4" />
			</button>
		</template>
		<template #title>Workspace settings</template>

		<div v-if="isFetchingWorkspace">
			<TwCard class="mb-8 rounded-lg ring-black ring-1 ring-opacity-5">
				<div>
					<Skeletor width="100" />
				</div>
				<div>
					<Skeletor width="160" class="mr-2" />
					<Skeletor width="24" />
				</div>
			</TwCard>
			<div class="lg:grid gap-8 grid-cols-[200px_1fr]">
				<div class="space-y-3">
					<div v-for="i in 5" :key="i">
						<Skeletor width="120" />
					</div>
				</div>
				<div>
					<TwCard class="mb-8 rounded-lg ring-black ring-1 ring-opacity-5">
						<div class="mb-5">
							<Skeletor width="200" />
						</div>
						<div class="space-y-4">
							<div v-for="i in 5" :key="i" class="flex justify-between">
								<Skeletor width="100" />
								<Skeletor width="100" />
							</div>
						</div>
					</TwCard>
				</div>
			</div>
		</div>
		<template v-else>
			<TwCard class="mb-8 rounded-lg ring-black ring-1 ring-opacity-5">
				<h1 class="text-xl font-medium">{{ workspace.name }}</h1>
				<a
					:href="`https://${workspace.subdomain}.catex.se`"
					target="_blank"
					class="flex items-center gap-2 text-gray-500 hover:underline hover:text-gray-900"
				>
					{{ `${workspace.subdomain}.catex.se` }}
					<ArrowTopRightOnSquareIcon class="w-5 h-5" />
				</a>
			</TwCard>

			<TabGroup vertical class="lg:grid gap-8 grid-cols-[200px_1fr]" as="div">
				<TabList class="-mx-2 mb-4 lg:mb-0">
					<Tab v-for="tab in tabs" :key="tab.name" v-slot="{ selected }" as="template">
						<a
							:class="[
								selected ? 'text-gray-900 font-semibold' : '',
								'block py-2 px-2 rounded-md text-gray-500 cursor-pointer hover:bg-gray-200',
							]"
						>
							{{ tab.label }}
						</a>
					</Tab>
				</TabList>
				<TabPanels>
					<TabPanel :key="`tab-panel-general`" class="space-y-6">
						<TwCard class="rounded-lg ring-black ring-1 ring-opacity-5">
							<h3 class="mb-5 font-semibold">Workspace information</h3>
							<TwList :headers="headers" :item="workspace" />
						</TwCard>
						<TwCard class="rounded-lg border border-red-300">
							<h3 class="mb-5 font-semibold">Delete workspace</h3>
							<p class="mb-5">This workspace will be permanently deleted. This action cannot be undone.</p>
							<TwButton variant="danger" @click="openDeletionModal = true">Delete this workspace</TwButton>
						</TwCard>
						<Teleport to="body">
							<Modal :open="openDeletionModal" @close="onCloseModal">
								<template #title>Delete workspace</template>
								<template #content>
									<div class="space-y-2">
										<p>
											Are you absolutely sure you want to delete
											<strong class="font-bold">{{ workspace.name }}</strong>
											?
										</p>
										<p><strong>This action cannot be undone</strong></p>
										<FormKit
											v-model="deletedWorkspaceName"
											placeholder="Type in the name of the workspace to confirm"
										/>
										<code>{{ workspace.name }}</code>
									</div>
								</template>
								<template #actions="{ close }">
									<TwButton variant="secondary" @click="close">Cancel</TwButton>
									<TwButton
										variant="danger"
										:disabled="deletedWorkspaceName !== workspace.name"
										:loading="isDeletingWorkspace"
										@click="deleteWorkspace"
									>
										Delete
									</TwButton>
								</template>
							</Modal>
						</Teleport>
					</TabPanel>
					<TabPanel :key="`tab-panel-domains`">
						<h3 class="font-semibold">Domains</h3>
						<p class="mb-4">Use your own domain for your workspace for free</p>

						<div class="flex gap-3 mb-6">
							<div class="flex-1">
								<FormKit type="text" placeholder="mywebsite.com" />
							</div>
							<TwButton>Add</TwButton>
						</div>
						<TwCard class="rounded-lg ring-black ring-1 ring-opacity-5">
							<div>
								<div>
									<h4>
										<a
											:href="`https://${workspace.subdomain}.catex.se`"
											target="_blank"
											class="flex items-center gap-2 text-lg text-gray-900 font-semibold"
										>
											{{ `${workspace.subdomain}.catex.se` }}
											<ArrowTopRightOnSquareIcon class="w-5 h-5" />
											<Badge variant="secondary">Default</Badge>
										</a>
									</h4>
								</div>
							</div>
						</TwCard>
					</TabPanel>
					<TabPanel :key="`tab-panel-back-office`" class="space-y-6">
						<TwCard class="rounded-lg ring-black ring-1 ring-opacity-5">
							<h3 class="mb-5 font-semibold">App version</h3>
							<FormSelectImageVersion v-model="form.app.version" repo="core" />
						</TwCard>
						<TwCard class="rounded-lg ring-black ring-1 ring-opacity-5">
							<h3 class="mb-5 font-semibold">Environment variables</h3>
							<FormAddEnv v-model="form.app.env" />
						</TwCard>
					</TabPanel>
					<TabPanel :key="`tab-panel-front-office`">
						<TwCard class="rounded-lg ring-black ring-1 ring-opacity-5">
							<h3 class="mb-5 font-semibol">Front office version</h3>
							<FormSelectImageVersion v-model="form.webapp.version" repo="front-office" />
						</TwCard>
					</TabPanel>
					<TabPanel :key="`tab-panel-extensions`">
						<TwCard :body-padding="false" class="my-2 rounded-lg ring-black ring-1 ring-opacity-5">
							<WorkspaceExtensionList :items="workspace.extensions"></WorkspaceExtensionList>
						</TwCard>
					</TabPanel>
				</TabPanels>
			</TabGroup>
		</template>
	</PageWrapper>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { ArrowLeftIcon, ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
import { useRoute } from 'vue-router'
import { useWorkspacesStore } from '@/stores/workspaces'
import { Workspace } from '@/types'

const store = useWorkspacesStore()
const route = useRoute()
const router = useRouter()
const { $api, $toast } = useNuxtApp()
const orgId = route.params.orgid as string
const wsId = route.params.id as string
const workspace = ref<Workspace>()
const form = ref({})
const isFetchingWorkspace = ref(true)
const deletedWorkspaceName = ref('')
const openDeletionModal = ref(false)
const isDeletingWorkspace = ref(false)

store
	.getWorkspace(orgId, wsId)
	.then((res) => {
		workspace.value = res
		form.value = { ...workspace.value }
	})
	.catch((err) => {
		throw new Error(String(err))
	})
	.finally(() => (isFetchingWorkspace.value = false))

definePageMeta({
	title: 'Workspace details',
	middleware: ['auth'],
})

const headers = [
	{ value: 'name', text: 'Name' },
	{ value: 'owner', text: 'Owner' },
	{ value: 'status', text: 'Status', display: 'status' },
]

const tabs = [
	{
		name: 'general',
		label: 'General',
	},
	{
		name: 'domains',
		label: 'Domains',
	},
	{
		name: 'back-office',
		label: 'Back office',
	},
	{
		name: 'front-office',
		label: 'Front office',
	},
	{
		name: 'extensions',
		label: 'Extensions',
	},
]

function onCloseModal() {
	openDeletionModal.value = false
	deletedWorkspaceName.value = ''
}

async function deleteWorkspace() {
	if (isDeletingWorkspace.value) return
	isDeletingWorkspace.value = true
	try {
		await $api.delete(`/api/v1alpha1/orgs/${orgId}/workspaces/${wsId}`)
		navigateTo(`/organizations/${orgId}`)
	} catch (err) {
		$toast.error({ title: 'Cannot delete this workspace', content: JSON.stringify(err.response.data) })
	}
	isDeletingWorkspace.value = false
}
</script>
