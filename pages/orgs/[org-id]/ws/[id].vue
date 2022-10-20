<template>
	<div>
		<NuxtPage />
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	title: 'Organization details',
	middleware: ['auth'],
})
</script>
