<template>
	<PageWrapper>
		<template #title>Organizations</template>

		<TwCard>
			<TwTable
				:headers="headers"
				:items="items"
				:row-click="(item) => navigateTo(`/organizations/${item.id}`)"
			>
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

<script setup>
definePageMeta({
	title: 'Dashboard',
	middleware: ['auth'],
})
const headers = ['name', 'owner']

const items = [
	{
		id: 1,
		name: 'Catex',
		owner: 'oscar@catex.se',
	},
	{
		id: 2,
		name: 'Hipnosis',
		owner: 'amy@atmartists.com',
	},
	{
		id: 3,
		name: 'Pangara',
		owner: 'buu.thai@pangara.com',
	},
]
</script>
