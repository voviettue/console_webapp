<template>
	<div>
		<NuxtPage v-if="workspace" :workspace="workspace" />
		<div v-else>Loading</div>
	</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useWorkspacesStore } from '@/stores/workspaces'
import { Workspace } from '@/types'

const store = useWorkspacesStore()
const route = useRoute()
const orgId = route.params.orgid as string
const wsId = route.params.id as string
const workspace = ref<Workspace>()
store
	.getWorkspace(orgId, wsId)
	.then((res) => {
		workspace.value = res
	})
	.catch((err) => {
		showError(err)
	})

definePageMeta({
	title: 'Workspace details',
	middleware: ['auth'],
})
</script>
