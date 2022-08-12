<template>
	<TwCard>
		<TwTable
			:headers="headers"
			:items="items"
			:row-click="(item) => navigateTo(`/workspaces/${item.id}`)"
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
</template>

<script setup>
const headers = [
	'name',
	'owner',
]

const items = [
	{
		id: 1,
		name: 'Terminal',
		owner: 'tu.nguyen@catex.se',
	},
]
</script>