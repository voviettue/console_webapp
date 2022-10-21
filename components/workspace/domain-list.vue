<template>
	<TwTable :headers="headers" :items="items">
		<template #items-actions>
			<TwButton variant="" size="sm">Edit</TwButton>
		</template>
	</TwTable>
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
