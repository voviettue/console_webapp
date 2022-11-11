<template>
	<div>
		<div class="mb-10 mt-6">
			<h1 class="mb-2">Discover</h1>
			<p class="text-lg">
				Discover, connect, and configure dev tools and APIs all within the Integrations Hub to extend the limits of web
				performance and team productivity.
			</p>
		</div>
		<div class="md:grid md:grid-cols-[200px_1fr] md:gap-6">
			<div class="mb-4 md:mb-0">
				<ul>
					<li
						v-for="category in categories"
						:key="category.id"
						class="py-2 px-2 rounded-md text-gray-500 cursor-pointer hover:bg-gray-200 hover:text-gray-900"
					>
						{{ category.text }}
					</li>
				</ul>
			</div>
			<div>
				<h2 class="mb-4 font-medium">All extensions</h2>
				<div class="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
					<template v-if="!store.extensions.length">
						<SkeletorExtensionMarketplace v-for="i in 6" :key="i" />
					</template>
					<template v-else>
						<MarketplaceExtensionItem
							v-for="extension in store.extensions"
							:key="extension.id"
							:extension="extension"
							:to="`/orgs/${attrs.org.name}/marketplace/${extension.package}`"
						/>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useExtensionsStore } from '@/stores/extensions'

const store = useExtensionsStore()
const attrs = useAttrs()
store.getExtensions()
const categories = ref([
	{
		id: 'all',
		text: 'All',
	},
	{
		id: 'interfaces',
		text: 'Interfaces',
	},
	{
		id: 'displays',
		text: 'Displays',
	},
	{
		id: 'e-com',
		text: 'E-commerce',
	},
	{
		id: 'cms',
		text: 'Content Management',
	},
	{
		id: 'app-builder',
		text: 'App builder',
	},
])
</script>
