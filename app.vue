<template>
	<Html>
		<Head>
			<Link rel="preconnect" href="https://fonts.googleapis.com" />
			<Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
			<Link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
		</Head>

		<Body class="bg-zinc-50 text-sm text-zinc-800">
			<div class="min-h-screen">
				<NuxtLayout>
					<NuxtLoadingIndicator />
					<NuxtPage />
				</NuxtLayout>
			</div>
		</Body>
	</Html>
</template>

<style>
@import '~/assets/css/main.css';
</style>
