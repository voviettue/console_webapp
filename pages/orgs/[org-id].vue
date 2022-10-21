<template>
	<PageWrapper>
		<template #breadcrumb>
			<Breadcrumb :items="[{ to: `/orgs/${orgId}/overview`, label: orgId }]" />
		</template>
		<template #topbar-menu>
			<div v-if="!isFetchingOrg" class="flex border-b border-gray-200 space-x-4 px-4">
				<NuxtLink
					v-for="({ name, to, current }, i) in menuItems"
					:key="i"
					:to="to"
					:class="[
						current ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500',
						'whitespace-nowrap py-2 px-1 text-sm',
					]"
				>
					{{ name }}
				</NuxtLink>
			</div>
		</template>
		<NuxtPage :org="org" />
	</PageWrapper>
</template>

<script setup lang="ts">
import { useOrgsStore } from '@/stores/orgs'
import { Org } from '@/types'
definePageMeta({
	title: 'Organization details',
	middleware: ['auth'],
})

const route = useRoute()
const store = useOrgsStore()
const orgId = route.params.orgid as string
const org = ref<Org>()
const isFetchingOrg = ref(true)
store
	.getOrg(orgId)
	.then((res) => (org.value = res))
	.catch(() => {
		showError('Organization not found')
	})
	.finally(() => (isFetchingOrg.value = false))

const menuItems = computed(() => {
	return [
		{
			name: 'Overview',
			to: buildPath(orgId, 'overview'),
			current: route.fullPath.startsWith(buildPath(orgId, 'overview')),
		},
		{
			name: 'Databases',
			to: buildPath(orgId, 'databases'),
			current: route.fullPath.startsWith(buildPath(orgId, 'databases')),
		},
		{
			name: 'Integrations',
			to: buildPath(orgId, 'marketplace'),
			current: route.fullPath.startsWith(buildPath(orgId, 'marketplace')),
		},
		{
			name: 'Settings',
			to: buildPath(orgId, 'settings'),
			current: route.fullPath.startsWith(buildPath(orgId, 'settings')),
		},
	]
})

function buildPath(orgId: string, to: string) {
	return `/orgs/${orgId}/${to}`
}
</script>
