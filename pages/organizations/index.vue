<template>
	<PageWrapper>
		<template #title>Organizations</template>
		<template #actions>
			<TwButton @click="navigateTo('/workspaces/create')">
				<template #prepend-outer>
					<PlusIcon class="mr-3 flex-shrink-0 h-4 w-4" aria-hidden="true" />
				</template>
				New organization
			</TwButton>
		</template>

		<TwCard :body-padding="false" class="rounded-lg ring-black ring-1 ring-opacity-5">
			<TwTable :headers="headers" :items="store.orgs" :row-click="(item) => navigateTo(`/organizations/${item.name}`)">
				<template #items-actions>
					<button
						class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
						type="button"
					>
						Edit
					</button>
				</template>
			</TwTable>
		</TwCard>
	</PageWrapper>
</template>

<script lang="ts" setup>
import { PlusIcon } from '@heroicons/vue/24/outline'
import { useOrgsStore } from '@/stores/orgs'
import { TableHeader } from '@/shared/types'

definePageMeta({
	title: 'Organizations',
	middleware: ['auth'],
})
const headers: TableHeader[] = [
	{
		value: 'name',
		text: 'Name',
	},
	{
		value: 'status',
		text: 'Status',
		display: 'status',
	},
]

const store = useOrgsStore()
store.getOrgs()
</script>
