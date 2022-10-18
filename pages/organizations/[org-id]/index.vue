<template>
	<PageWrapper>
		<div v-if="isFetchingOrg">
			<TwCard class="mb-8 rounded-lg ring-black ring-1 ring-opacity-5">
				<div>
					<Skeletor width="100" />
				</div>
				<div>
					<Skeletor width="160" class="mr-2" />
				</div>
			</TwCard>
		</div>
		<template v-else>
			<TwCard class="mb-6 rounded-lg ring-black ring-1 ring-opacity-5">
				<h1 class="text-xl font-normal text-gray-900">{{ `Organization ${org.name}` }}</h1>
				<p class="text-gray-500">Owned by Thien Nguyen</p>
			</TwCard>

			<TabGroup>
				<div class="border-b border-gray-200">
					<TabList class="-mb-px flex space-x-4">
						<Tab v-for="tab in tabs" :key="tab.name" v-slot="{ selected }" as="template">
							<a
								:class="[
									selected
										? 'border-indigo-500 text-indigo-600'
										: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer',
									'whitespace-nowrap py-2 px-1 border-b-2 text-sm',
								]"
							>
								{{ tab.label }}
							</a>
						</Tab>
					</TabList>
				</div>

				<TabPanels>
					<TabPanel :key="`tab-panel-workspaces`">
						<OrganizationWorkspaceList class="my-3" :org-id="orgId"></OrganizationWorkspaceList>
					</TabPanel>
					<TabPanel :key="`tab-panel-databases`">
						<OrganizationDatabaseList class="my-3" :org-id="orgId"></OrganizationDatabaseList>
					</TabPanel>
				</TabPanels>
			</TabGroup>
		</template>
	</PageWrapper>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { useOrgsStore } from '@/stores/orgs'
import { Org } from '@/types'

definePageMeta({
	title: 'Organization details',
	middleware: ['auth'],
})

const route = useRoute()
const store = useOrgsStore()
const orgId = route.params.orgid as string
const org = ref<Org>()
const isFetchingOrg = ref(true)
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

store
	.getOrg(orgId)
	.then((res) => (org.value = res))
	.catch(() => navigateTo('/organizations'))
	.finally(() => (isFetchingOrg.value = false))
</script>
