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
		<template #title>Organization details</template>

		<TwCard class="mb-6 rounded-lg ring-black ring-1 ring-opacity-5">
			<TwList :headers="headers" :item="org" />
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
				<TabPanel :key="`tab-panel-workspaces`">
					<div class="py-2">
						<div class="mb-4 text-right">
							<TwButton @click="navigateTo(`/organizations/${orgId}/new-workspace`)">
								<template #prepend-outer>
									<PlusIcon class="mr-3 flex-shrink-0 h-4 w-4" aria-hidden="true" />
								</template>
								New workspace
							</TwButton>
						</div>
						<TwCard :body-padding="false" class="rounded-lg ring-black ring-1 ring-opacity-5">
							<OrganizationWorkspaceList :org-id="orgId"></OrganizationWorkspaceList>
						</TwCard>
					</div>
				</TabPanel>

				<TabPanel :key="`tab-panel-workspaces`">
					<div class="py-2">
						<div class="mb-4 text-right">
							<TwButton>
								<template #prepend-outer>
									<PlusIcon class="mr-3 flex-shrink-0 h-4 w-4" aria-hidden="true" />
								</template>
								New database
							</TwButton>
						</div>
						<TwCard :body-padding="false" class="rounded-lg ring-black ring-1 ring-opacity-5">
							<OrganizationDatabaseList :org-id="orgId"></OrganizationDatabaseList>
						</TwCard>
					</div>
				</TabPanel>
			</TabPanels>
		</TabGroup>
	</PageWrapper>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { PlusIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'
import { useOrgsStore } from '@/stores/orgs'
import { Org } from '@/types'

const route = useRoute()
const router = useRouter()
const store = useOrgsStore()
const orgId = route.params.orgid as string

const org = ref<Org>()
try {
	org.value = await store.getOrg(orgId)
} catch (error) {
	navigateTo('/organizations')
}

definePageMeta({
	title: 'Organization details',
	middleware: ['auth'],
})

const headers = [
	{ value: 'name', text: 'Name' },
	{ value: 'owner', text: 'Owner' },
]

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
