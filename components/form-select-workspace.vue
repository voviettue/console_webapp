<script lang="ts" setup>
import { useOrgsStore } from '@/stores/orgs'
import { useWorkspacesStore } from '@/stores/workspaces'

const emit = defineEmits('update:org', 'update:workspace')

const orgStore = useOrgsStore()
const wsStore = useWorkspacesStore()
await orgStore.getOrgs()
const orgOptions = computed(() => {
	return orgStore.orgs.map((item) => {
		return {
			value: item.name,
			label: item.name,
		}
	})
})

const wsOptions = computed(() => {
	return wsStore.workspaces.map((item) => {
		return {
			value: item.name,
			label: item.name,
		}
	})
})

const isFetchingWs = ref(false)
const isDisableWsSelect = computed(() => {
	return isFetchingWs
})

async function onSelectOrg(value) {
	if (!value) return
	isFetchingWs.value = true
	await wsStore.getWorkspaces(value)
	isFetchingWs.value = false
	emit('update:org', value)
}

function onSelectWorkspace(value) {
	emit('update:workspace', value)
}
</script>

<template>
	<div class="flex gap-2">
		<div class="flex-1">
			<FormKit type="select" placeholder="Select a organization" :options="orgOptions" @input="onSelectOrg" />
		</div>
		<div class="flex-1">
			<FormKit
				type="select"
				placeholder="Select a workspace"
				:options="wsOptions"
				:disabled="isDisableWsSelect"
				@input="onSelectWorkspace"
			/>
		</div>
	</div>
</template>
