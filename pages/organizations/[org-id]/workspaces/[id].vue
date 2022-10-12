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

		<TabGroup vertical class="lg:grid gap-8 grid-cols-[200px_1fr]" as="div">
			<TabList class="-mx-2">
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
				<TabPanel :key="`tab-panel-general`">
					<TwCard class="rounded-lg ring-black ring-1 ring-opacity-5">
						<h3 class="mb-5">Workspace information</h3>
						<TwList :headers="headers" :item="workspace" />
					</TwCard>
				</TabPanel>
				<TabPanel :key="`tab-panel-domains`">
					<h3>Domains</h3>
					<p class="mb-4">Use your own domain for your workspace for free</p>

					<div class="flex gap-3 mb-6">
						<div class="flex-1">
							<FormKit type="text" placeholder="mywebsite.com" />
						</div>
						<TwButton>Add</TwButton>
					</div>
					<TwCard class="my-2 rounded-lg ring-black ring-1 ring-opacity-5">
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
						<h3 class="mb-5">App version</h3>
						<FormSelectImageVersion v-model="form.app.version" repo="core" />
					</TwCard>
					<TwCard class="rounded-lg ring-black ring-1 ring-opacity-5">
						<h3 class="mb-5">Environment variables</h3>
						<FormAddEnv v-model="form.app.env" />
					</TwCard>
				</TabPanel>
				<TabPanel :key="`tab-panel-front-office`">
					<TwCard class="rounded-lg ring-black ring-1 ring-opacity-5">
						<h3 class="mb-5">Front office version</h3>
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
const orgId = route.params.orgid as string
const wsId = route.params.id as string
const workspace = ref<Workspace>()
const form = ref({})

store
	.getWorkspace(orgId, wsId)
	.then((res) => {
		workspace.value = res
		form.value = { ...workspace.value }
	})
	.catch((err) => {
		throw new Error(String(err))
	})

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
</script>
