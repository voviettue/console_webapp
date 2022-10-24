<template>
	<PageWrapper>
		<template #title>Extensions</template>
		<template #actions>
			<TwButton variant="soft-primary" @click="syncAll" :loading="isSyncing">Sync all</TwButton>
		</template>
		<TwCard :body-padding="false">
			<TwTable
				v-if="store.extensions.length"
				:headers="headers"
				:items="store.extensions"
				:row-click="(item) => navigateTo(`/admin/extensions/${item.package}`)"
			>
				<template #item-name="{ item }">
					<span>{{ `@${item.namespace}/${item.package}` }}</span>
				</template>
			</TwTable>
			<SkeletorTable v-else :headers="headers" />
		</TwCard>
	</PageWrapper>
</template>

<script lang="ts" setup>
import { useExtensionsStore } from '@/stores/extensions'
import { TableHeader } from '@/shared/types'

definePageMeta({
	title: 'Extensions',
	middleware: ['auth'],
})

const headers: TableHeader[] = [
	{
		value: 'title',
		text: 'Title',
	},
	{
		value: 'name',
		text: 'Name',
	},
	{
		value: 'defaultDisplayVersion',
		text: 'Latest version',
	},
	{
		value: 'updatedAt',
		text: 'Date updated',
		display: 'date',
	},
	{
		value: 'syncedAt',
		text: 'Date synced',
		display: 'date',
	},
]
const store = useExtensionsStore()
const { $api } = useNuxtApp()
store.getExtensions()

const isSyncing = ref(false)

async function syncAll() {
	isSyncing.value = true
	try {
		await $api.put('/api/meta/extensions/sync')
		store.getExtensions()
	} catch (err) {
		//
	}
	isSyncing.value = false
}
</script>
