<template>
	<PageWrapper>
		<template #title>Workspace Details</template>

		<TwCard class="mb-6">
			<TwList :headers="headers" :item="workspace">
				<template #item-domain="{ item }">{{ item.subdomain + '.' + item.domain }}</template>
			</TwList>
		</TwCard>

		<TabGroup>
			<div class="border-b border-gray-200">
				<TabList class="-mb-px flex space-x-8">
					<Tab v-for="tab in tabs" :key="tab.name" v-slot="{ selected }" as="template">
						<a
							:class="[
								selected
									? 'border-indigo-500 text-indigo-600'
									: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer',
								'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
							]"
						>
							{{ tab.label }}
						</a>
					</Tab>
				</TabList>
			</div>

			<TabPanels>
				<TabPanel :key="`tab-panel-domains`">
					<TwCard :body-padding="false" class="my-2 rounded-lg ring-black ring-1 ring-opacity-5">
						<WorkspaceDomainList></WorkspaceDomainList>
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
import { useRoute } from 'vue-router'
import { useWorkspacesStore } from '@/stores/workspaces'
import { Workspace } from '@/types'
const store = useWorkspacesStore()
const route = useRoute()
const orgId = route.params.orgid as string
const wsId = route.params.id as string

const workspace = ref<Workspace>()

try {
	workspace.value = await store.getWorkspace(orgId, wsId)
} catch (err) {
	// @TODO: handle error
}

definePageMeta({
	title: 'Workspace details',
	middleware: ['auth'],
})

const headers = [
	{ value: 'name', text: 'Name' },
	{ value: 'domain', text: 'Domain' },
	{ value: 'status', text: 'Status' },
	{ value: 'owner', text: 'Owner' },
]

const tabs = [
	{
		name: 'domains',
		label: 'Domains',
	},
	{
		name: 'extensions',
		label: 'Extensions',
	},
]
</script>
