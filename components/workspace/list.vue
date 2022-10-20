<template>
	<div>
		<div class="mb-8 md:flex md:items-center md:justify-between">
			<div class="w-full md:w-[400px] shrink-1 mb-2 md:mb-0">
				<FormKit v-model="searchText" placeholder="Search workspaces" />
			</div>
			<div class="flex items-center md:justify-end space-x-2">
				<TwButton class="w-full md:w-auto" @click="navigateTo(`/orgs/${orgId}/new-workspace`)">New workspace</TwButton>
				<DropdownAutoRefresh v-model="refreshInterval" class="w-full md:w-auto" @refresh="refresh" />
			</div>
		</div>
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
			<template v-if="store.workspaces.length">
				<WorkspaceItem v-for="ws in filteredWorkspaces" :key="ws.name" :workspace="ws" />
			</template>
			<template v-else>
				<div v-for="i in 6" :key="i" class="p-6 rounded-lg shadow border border-gray-200">
					<div>
						<Skeletor width="100" />
					</div>
					<div class="mb-4">
						<Skeletor width="160" class="mr-2" />
					</div>
					<div class="md:flex gap-8">
						<div>
							<div><Skeletor width="80" /></div>
							<div><Skeletor width="100" /></div>
						</div>
						<div>
							<div><Skeletor width="80" /></div>
							<div><Skeletor width="100" /></div>
						</div>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useWorkspacesStore } from '@/stores/workspaces'

const props = defineProps<{
	orgId: string
}>()
const { refreshInterval } = useCollectionPreset('org_details_workspaces')

const store = useWorkspacesStore()
const isFetchingWorkspaces = ref(true)
store.getWorkspaces(props.orgId).finally(() => (isFetchingWorkspaces.value = false))

const searchText = ref('')
const filteredWorkspaces = computed(() => {
	const query = searchText.value.trim()
	if (query === '') return store.workspaces

	return store.workspaces.filter((ws) => {
		return ws.name.includes(query)
	})
})

const refresh = () => {
	store.getWorkspaces(props.orgId)
}
</script>
