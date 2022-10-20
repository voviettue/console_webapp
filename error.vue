<script lang="ts" setup>
definePageMeta({
	layout: 'auth',
})
defineProps({
	error: Object,
})
</script>
<template>
	<div class="min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
		<div class="mx-auto max-w-max">
			<main class="text-center">
				<h1 class="text-4xl mb-4 font-medium text-gray-900 sm:text-5xl">Page not found</h1>
				<p class="text-gray-500 mb-8 text-lg">You might not have permissions to see this page.</p>
				<TwButton @click="navigateTo('/')">Go back home</TwButton>
			</main>
		</div>
	</div>
</template>
