<template>
	<div>
		<h1 class="font-medium text-2xl mb-8">Workspace Settings</h1>
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
					<TwCard>
						<h3 class="mb-5 font-semibold">Workspace information</h3>
						<TwList :headers="headers" :item="workspace" />
					</TwCard>
					<TwCard class="border border-red-300">
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
									<FormKit v-model="deletedWorkspaceName" placeholder="Type in the name of the workspace to confirm" />
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
					<TwCard>
						<div class="flex items-center gap-3">
							<a
								:href="`https://${workspace.subdomain}.catex.se`"
								target="_blank"
								class="flex items-center gap-2 text-lg text-gray-900 font-semibold hover:underline"
							>
								{{ `${workspace.subdomain}.catex.se` }}
								<ArrowTopRightOnSquareIcon class="w-5 h-5" />
							</a>
							<Badge variant="secondary">Default</Badge>
						</div>
					</TwCard>
				</TabPanel>
				<TabPanel :key="`tab-panel-back-office`" class="space-y-6">
					<TwCard>
						<h3 class="mb-5 font-semibold">App versions</h3>
						<div class="mb-2">Chart version {{ workspace.app.chartVersion }}</div>
						<div class="mb-2 flex items-center">
							App version&nbsp;
							<span>{{ workspace.app.version }}</span>
							<TwButton class="ml-4" variant="secondary" size="sm">Edit</TwButton>
						</div>
						<!-- <FormSelectImageVersion v-model="form.app.version" repo="core" /> -->
					</TwCard>
					<TwCard>
						<h3 class="mb-5 font-semibold">App information</h3>
						<div>Admin email: {{ workspace.app.adminEmail }}</div>
					</TwCard>
					<TwCard>
						<h3 class="mb-5 font-semibold">Environment variables</h3>
						<FormAddEnv v-model="form.app.env" />
					</TwCard>
				</TabPanel>
				<TabPanel :key="`tab-panel-front-office`">
					<TwCard>
						<h3 class="mb-5 font-semibold">Front office</h3>
						<template v-if="workspace.webapp.enabled">
							<a
								:href="`https://app.${workspace.subdomain}.catex.se`"
								target="_blank"
								class="flex items-center gap-2 text-gray-500 hover:underline hover:text-gray-900 mb-3"
							>
								{{ `app.${workspace.subdomain}.catex.se` }}
								<ArrowTopRightOnSquareIcon class="w-5 h-5" />
							</a>
							<div class="flex items-center">
								Version&nbsp;
								<span>{{ workspace.webapp.version }}</span>
								<TwButton class="ml-4" variant="secondary" size="sm">Edit</TwButton>
							</div>
						</template>
						<template v-else>
							<TwButton>Create front office</TwButton>
						</template>
						<!-- <FormSelectImageVersion v-model="form.webapp.version" repo="front-office" /> -->
					</TwCard>
				</TabPanel>
				<TabPanel :key="`tab-panel-extensions`">
					<TwCard :body-padding="false" class="my-2 rounded-lg ring-black ring-1 ring-opacity-5">
						<WorkspaceExtensionList :items="workspace.extensions"></WorkspaceExtensionList>
					</TwCard>
				</TabPanel>
			</TabPanels>
		</TabGroup>
	</div>
</template>

<script lang="ts" setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
import { useRoute } from 'vue-router'
import { useWorkspacesStore } from '@/stores/workspaces'
import { Workspace } from '@/types'

const store = useWorkspacesStore()
const route = useRoute()
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
		showError(err)
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
	{ value: 'createdAt', text: 'Created at' },
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
		navigateTo(`/orgs/${orgId}/overview`)
	} catch (err) {
		$toast.error({ title: 'Cannot delete this workspace', content: JSON.stringify(err.response.data) })
	}
	isDeletingWorkspace.value = false
}
</script>
