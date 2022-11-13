<script lang="ts" setup>
import { useTemplatesStore } from '@/stores/templates'
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
		value: 'org',
		text: 'Organization',
	},
	{
		value: 'workspace',
		text: 'Workspace',
	},
	{
		value: 'updatedAt',
		text: 'Date updated',
		display: 'date',
	},
	{
		value: 'public',
		text: '',
	},
]
const store = useTemplatesStore()

const isFetching = ref(true)

store.getTemplates().finally(() => (isFetching.value = false))
</script>

<template>
	<div class="flex justify-between">
		<h2 class="font-medium">Templates</h2>
		<div class="flex gap-2">
			<TwButton variant="primary" @click="navigateTo(`/admin/templates/new`)">New template</TwButton>
		</div>
	</div>
	<TwCard :body-padding="false">
		<SkeletorTable v-if="isFetching" :headers="headers" />
		<TwTable v-else :headers="headers" :items="store.templates">
			<template #item-name="{ item }">
				<NuxtLink :to="`/admin/templates/${item.name}`" class="text-blue-600 cursor-pointer hover:underline">
					{{ `${item.name}` }}
				</NuxtLink>
			</template>
			<template #item-public="{ item }">
				<Badge v-if="item.public" variant="success">Public</Badge>
				<Badge v-else variant="warning">Private</Badge>
			</template>
		</TwTable>
	</TwCard>
</template>
