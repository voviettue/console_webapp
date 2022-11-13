<template>
	<div>
		<div class="mb-10 mt-6">
			<h1 class="mb-2">Discover</h1>
			<p class="text-lg">
				Discover, connect, and configure dev tools and APIs all within the Integrations Hub to extend the limits of web
				performance and team productivity.
			</p>
		</div>
		<div class="md:grid md:grid-cols-[200px_1fr] md:gap-10">
			<div class="mb-4 md:mb-0">
				<div v-if="isFetchingCat" class="flex flex-col gap-4">
					<Skeletor v-for="i in 5" :key="i" width="100" />
				</div>
				<ul v-else>
					<li>
						<a
							href="#"
							:class="[
								selectedCat === '' ? 'font-semibold text-gray-900' : '',
								'block py-2 px-2 rounded-md text-gray-500 cursor-pointer hover:bg-gray-200 hover:text-gray-900',
							]"
							@click="filter('')"
						>
							All
						</a>
					</li>
					<li v-for="category in categories" :key="category.name">
						<a
							:href="`#${category.name}`"
							:class="[
								selectedCat === category.name ? 'font-semibold text-gray-900' : '',
								'block py-2 px-2 rounded-md text-gray-500 cursor-pointer hover:bg-gray-200 hover:text-gray-900',
							]"
							@click="filter(category.name)"
						>
							{{ category.title }}
						</a>
					</li>
				</ul>
			</div>
			<div>
				<div class="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
					<template v-if="isFetchingExt">
						<SkeletorExtensionMarketplace v-for="i in 6" :key="i" />
					</template>
					<template v-else-if="store.extensions.length">
						<MarketplaceExtensionItem
							v-for="extension in store.extensions"
							:key="extension.id"
							:extension="extension"
							:to="`/orgs/${attrs.org.name}/marketplace/${extension.package}`"
						/>
					</template>
					<div v-else class="p-6 text-center text-gray-500">No extensions found</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { Category } from '@/types'
import { useExtensionsStore } from '@/stores/extensions'

const { $api } = useNuxtApp()
const store = useExtensionsStore()
const attrs = useAttrs()
const categories = ref<Category[]>([])
const isFetchingExt = ref(true)
const isFetchingCat = ref(true)
const selectedCat = ref(window.location.hash.replace('#', ''))

store.getExtensions({ category: window.location.hash.replace('#', '') }).finally(() => (isFetchingExt.value = false))
getCategories().finally(() => (isFetchingCat.value = false))

async function getCategories() {
	const res = await $api.get(`/api/meta/ext-categories`)
	categories.value = res.data.data
}

function filter(category: string) {
	isFetchingExt.value = true
	selectedCat.value = category
	store.getExtensions({ category }).finally(() => (isFetchingExt.value = false))
}
</script>
