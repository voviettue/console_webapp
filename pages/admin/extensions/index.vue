<template>
	<PageWrapper>
		<template #title>Extensions</template>
		<template #actions>
			<div class="flex gap-2">
				<TwButton variant="primary" @click="navigateTo(`/admin/extensions/new`)">New extension</TwButton>
				<TwButton variant="secondary" :loading="isSyncing" @click="syncAll">Sync all</TwButton>
			</div>
		</template>
		<TwCard :body-padding="false">
			<TwTable
				v-if="!isFetching"
				:headers="headers"
				:items="store.extensions"
				:row-click="(item) => navigateTo(`/admin/extensions/${item.package}`)"
			>
				<template #item-name="{ item }">
					<span>{{ `@${item.namespace}/${item.package}` }}</span>
				</template>
				<template #item-public="{ item }">
					<Badge v-if="item.public" variant="success">Public</Badge>
					<Badge v-else variant="warning">Private</Badge>
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
	{
		value: 'public',
		text: '',
	},
]
const store = useExtensionsStore()
const { $api } = useNuxtApp()

const isFetching = ref(true)
const isSyncing = ref(false)

store.getExtensions().finally(() => (isFetching.value = false))

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
