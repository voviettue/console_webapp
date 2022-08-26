<template>
	<TwCard>
		<TwTable :headers="headers" :items="items">
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
const headers = ['domain', 'ip']

const items = [
	{
		domain: 'terminal.catex.se',
		ip: '127.0.0.1',
	},
]
</script>
