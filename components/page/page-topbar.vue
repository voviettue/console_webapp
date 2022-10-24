<template>
	<div class="z-10 flex-shrink-0 bg-white">
		<div class="flex-1 px-4 flex justify-between py-3">
			<div class="flex-1 flex">
				<div class="flex gap-4 items-center">
					<NuxtLink>
						<img class="w-6" src="/img/logo.png" alt="Workflow" />
					</NuxtLink>
					<Breadcrumb :items="breadcrumbItems" />
				</div>
			</div>
			<div class="ml-4 flex items-center gap-6 md:ml-6">
				<div class="flex gap-4 text-sm">
					<a href="#" class="text-gray-500 hover:underline">Changelog</a>
					<a href="#" class="text-gray-500 hover:underline">Help</a>
					<a href="#" class="text-gray-500 hover:underline">Docs</a>
				</div>
				<Menu as="div" class="ml-3 relative z-40">
					<div>
						<MenuButton
							class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							<span class="sr-only">Open user menu</span>
							<UserCircleIcon class="avatar-icon h-8 w-8 rounded-full" />
						</MenuButton>
					</div>
					<transition
						enter-active-class="transition ease-out duration-100"
						enter-from-class="transform opacity-0 scale-95"
						enter-to-class="transform opacity-100 scale-100"
						leave-active-class="transition ease-in duration-75"
						leave-from-class="transform opacity-100 scale-100"
						leave-to-class="transform opacity-0 scale-95"
					>
						<MenuItems
							class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none divide-y"
						>
							<div class="px-4 py-2">
								<span class="block text-xs text-gray-500">Signed in as</span>
								<span class="mt-0.5 font-semibold">thien@catex.se</span>
							</div>
							<div>
								<MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
									<a :href="item.href" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
										{{ item.name }}
									</a>
								</MenuItem>
								<MenuItem v-slot="{ active }">
									<a
										:class="[active ? 'bg-gray-100' : '', 'w-full text-left block px-4 py-2 text-sm text-gray-700']"
										:href="logoutUrl"
									>
										Sign out
									</a>
								</MenuItem>
							</div>
						</MenuItems>
					</transition>
				</Menu>
			</div>
		</div>
	</div>
	<div class="sticky top-0 bg-white" v-if="menuItems.length">
		<div class="flex border-b border-gray-200 space-x-4 px-4">
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
	</div>
</template>

<script lang="ts" setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { UserCircleIcon } from '@heroicons/vue/24/outline'

const route = useRoute()

const userNavigation = [
	{ name: 'Your Profile', href: '#' },
	{ name: 'Settings', href: '#' },
]

// @TODO: Finding a better way
const breadcrumbItems = computed(() => {
	const params = route.params
	if (String(route.name).startsWith('orgs-orgid-ws')) {
		return [
			{ to: `/orgs/${params.orgid}/overview`, label: params.orgid },
			{ to: `/orgs/${params.orgid}/ws/${params.id}/overview`, label: params.id },
		]
	}
	if (String(route.name).startsWith('orgs-orgid')) {
		return [{ to: `/orgs/${params.orgid}/overview`, label: params.orgid }]
	}
	if (String(route.name).startsWith('admin')) {
		return [{ to: `/admin/orgs`, label: 'admin' }]
	}
	return []
})

// @TODO: Finding a better way
const menuItems = computed(() => {
	const params = route.params
	if (String(route.name).startsWith('orgs-orgid-ws')) {
		return [
			{
				name: 'Overview',
				to: `/orgs/${params.orgid}/ws/${params.id}/overview`,
				current: isCurrentRoute(route, `/orgs/${params.orgid}/ws/${params.id}/overview`),
			},
			{
				name: 'Snapshots',
				to: `/orgs/${params.orgid}/ws/${params.id}/snapshots`,
				current: isCurrentRoute(route, `/orgs/${params.orgid}/ws/${params.id}/snapshots`),
			},
			{
				name: 'Settings',
				to: `/orgs/${params.orgid}/ws/${params.id}/settings`,
				current: isCurrentRoute(route, `/orgs/${params.orgid}/ws/${params.id}/settings`),
			},
		]
	}
	if (String(route.name).startsWith('orgs-orgid')) {
		return [
			{
				name: 'Overview',
				to: `/orgs/${params.orgid}/overview`,
				current: isCurrentRoute(route, `/orgs/${params.orgid}/overview`),
			},
			{
				name: 'Databases',
				to: `/orgs/${params.orgid}/databases`,
				current: isCurrentRoute(route, `/orgs/${params.orgid}/databases`),
			},
			{
				name: 'Integrations',
				to: `/orgs/${params.orgid}/marketplace`,
				current: isCurrentRoute(route, `/orgs/${params.orgid}/marketplace`),
			},
			{
				name: 'Settings',
				to: `/orgs/${params.orgid}/settings`,
				current: isCurrentRoute(route, `/orgs/${params.orgid}/settings`),
			},
		]
	}
	if (String(route.name).startsWith('admin')) {
		return [
			{
				name: 'Organizations',
				to: `/admin/orgs`,
				current: isCurrentRoute(route, `/admin/orgs`),
			},
			{
				name: 'Extensions',
				to: `/admin/extensions`,
				current: isCurrentRoute(route, `/admin/extensions`),
			},
			{
				name: 'Templates',
				to: `/admin/templates`,
				current: isCurrentRoute(route, `/admin/templates`),
			},
		]
	}
	return []
})

// Cognito
const { url, cognito } = useRuntimeConfig()
const query = new URLSearchParams()
query.append('client_id', cognito.clientId)
query.append('logout_uri', `${url}/logout-callback`)
const logoutUrl = `${cognito.domain}/logout?${decodeURIComponent(query.toString())}`

function isCurrentRoute(route: any, path: string) {
	return route.fullPath.startsWith(path)
}
</script>
