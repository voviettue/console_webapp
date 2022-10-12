<script lang="ts" setup>
definePageMeta({
	layout: 'auth',
})
</script>
<template>
	<div class="min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
		<div class="mx-auto max-w-max">
			<main class="sm:flex">
				<p class="text-4xl font-bold tracking-tight text-indigo-600 sm:text-5xl">404</p>
				<div class="sm:ml-6">
					<div class="sm:border-l sm:border-gray-200 sm:pl-6">
						<h1 class="text-4xl font-medium tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
					</div>
					<div class="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
						<TwButton @click="navigateTo('/')">Go back home</TwButton>
					</div>
				</div>
			</main>
		</div>
	</div>
</template>
