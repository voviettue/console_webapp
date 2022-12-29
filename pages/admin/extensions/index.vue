<template>
	<PageWrapper>
		<TabGroup :selected-index="selectedTab" vertical class="lg:grid gap-8 grid-cols-[150px_1fr]" as="div">
			<TabList class="-mx-2 mb-4 lg:mb-0">
				<Tab v-for="tab in tabs" :key="tab.name" v-slot="{ selected }" as="template">
					<a
						:href="`#${tab.name}`"
						:class="[
							selected ? 'text-gray-900 font-semibold' : '',
							'block py-2 px-2 rounded-md text-gray-500 cursor-pointer hover:bg-gray-200',
						]"
					>
						{{ tab.label }}
					</a>
				</Tab>
			</TabList>
			<TabPanels>
				<TabPanel :key="`tab-panel-extensions`" class="space-y-6">
					<AdminExtensionPanelList />
				</TabPanel>
				<TabPanel :key="`tab-panel-cateegories`" class="space-y-6">
					<AdminExtensionPanelCategories />
				</TabPanel>
			</TabPanels>
		</TabGroup>
	</PageWrapper>
</template>

<script lang="ts" setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

definePageMeta({
	title: 'Extensions',
})

const tabs = [
	{
		name: 'extensions',
		label: 'All extensions',
	},
	{
		name: 'categories',
		label: 'Categories',
	},
]
const selectedTab = ref(0)
if (window.location.hash !== '') {
	selectedTab.value = tabs.findIndex((item) => '#' + item.name === window.location.hash)
}
</script>
