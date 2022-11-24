<template>
	<div>
		<h1 class="font-medium text-2xl mb-8">Workspace Settings</h1>
		<TabGroup :selected-index="selectedTab" vertical class="lg:grid gap-8 grid-cols-[200px_1fr]" as="div">
			<TabList class="-mx-2 mb-4 lg:mb-0">
				<Tab v-for="tab in tabs" :key="tab.name" v-slot="{ selected }" as="template">
					<a
						:href="`#${tab.name}`"
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
					<WorkspaceInformationBox :item="workspace" />
					<WorkspaceDeleteBox :item="workspace" :org="orgId" />
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
import { Workspace } from '@/types'

const route = useRoute()
const { $api, $toast } = useNuxtApp()
const orgId = route.params.orgid as string
const wsId = route.params.id as string
const attrs = useAttrs()
const workspace = ref(attrs.workspace) as Workspace
const form = ref(attrs.workspace)

definePageMeta({
	title: 'Workspace details',
	middleware: ['auth'],
})

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
const selectedTab = ref(0)
if (window.location.hash !== '') {
	selectedTab.value = tabs.findIndex((item) => '#' + item.name === window.location.hash)
}
</script>
