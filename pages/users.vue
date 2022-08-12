<template>
	<PageWrapper>
		<template #title>Users</template>

		<TwCard>
			<TwTable
				:headers="headers"
				:items="items"
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
const headers = [
	'name',
	'email',
	'title',
	'role',
	{ value: 'actions', text: '' },
]

const items = [
	{
		name: 'Dat Tieu',
		title: 'Engineer',
		email: 'dat@catex.se',
		role: 'Admin',
	},
]
</script>
