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
					<WorkspaceInfoBox :item="workspace" />
					<WorkspaceDeleteBox :item="workspace" />
				</TabPanel>
				<TabPanel :key="`tab-panel-domains`">
					<WorkspaceDomainBox :item="workspace" />
				</TabPanel>
				<TabPanel :key="`tab-panel-back-office`" class="space-y-6">
					<WorkspaceAppInfoBox :item="workspace" />
					<WorkspaceAppEnvBox :item="workspace" />
				</TabPanel>
				<TabPanel :key="`tab-panel-front-office`">
					<WorkspaceWebappInfoBox :item="workspace" />
				</TabPanel>
				<TabPanel :key="`tab-panel-ledger`">
					<WorkspaceLedgerBox :item="workspace" />
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
import { Workspace } from '@/types'

const attrs = useAttrs()
const workspace = ref(attrs.workspace) as Workspace

definePageMeta({
	title: 'Workspace details',
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
		name: 'ledger',
		label: 'Ledger',
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
