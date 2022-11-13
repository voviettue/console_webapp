<script lang="ts" setup>
import { useExtensionsStore } from '@/stores/extensions'
import { TableHeader } from '@/shared/types'

const headers: TableHeader[] = [
	{
		value: 'name',
		text: 'Name',
	},
	{
		value: 'title',
		text: 'Title',
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

<template>
	<div class="flex justify-between">
		<h2 class="font-medium">Extensions</h2>
		<div class="flex gap-2">
			<TwButton variant="primary" @click="navigateTo(`/admin/extensions/new`)">New extension</TwButton>
			<TwButton variant="secondary" :loading="isSyncing" @click="syncAll">Sync all</TwButton>
		</div>
	</div>
	<TwCard :body-padding="false">
		<SkeletorTable v-if="isFetching" :headers="headers" />
		<TwTable v-else :headers="headers" :items="store.extensions">
			<template #item-name="{ item }">
				<NuxtLink :to="`/admin/extensions/${item.package}`" class="text-blue-600 cursor-pointer hover:underline">
					{{ `${item.package}` }}
				</NuxtLink>
			</template>
			<template #item-public="{ item }">
				<Badge v-if="item.public" variant="success">Public</Badge>
				<Badge v-else variant="warning">Private</Badge>
			</template>
		</TwTable>
	</TwCard>
</template>
