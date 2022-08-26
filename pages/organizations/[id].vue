<template>
	<PageWrapper>
		<template #title>Organization Details</template>

		<TwCard class="mb-6">
			<TwList :headers="headers" :item="item" />
		</TwCard>

		<TabGroup>
			<div class="border-b border-gray-200">
				<TabList class="-mb-px flex space-x-8">
					<Tab
						v-for="tab in tabs"
						:key="tab.name"
						v-slot="{ selected }"
						as="template"
					>
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
				<TabPanel :key="`tab-panel-workspaces`">
					<OrganizationWorkspaceList></OrganizationWorkspaceList>
				</TabPanel>

				<TabPanel :key="`tab-panel-workspaces`">
					<OrganizationDatabaseList></OrganizationDatabaseList>
				</TabPanel>
			</TabPanels>
		</TabGroup>
	</PageWrapper>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

definePageMeta({
	title: 'Dashboard',
	middleware: ['auth'],
})

const headers = [
	{ value: 'name', text: 'Name' },
	{ value: 'owner', text: 'Owner' },
]

const item = {
	id: 1,
	name: 'Catex',
	owner: 'oscar@catex.se',
}

const tabs = [
	{
		name: 'workspaces',
		label: 'Workspaces',
	},
	{
		name: 'databases',
		label: 'Databases',
	},
]
</script>
