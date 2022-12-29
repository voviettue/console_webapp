<template>
	<PageWrapper>
		<NuxtPage :org="org" />
	</PageWrapper>
</template>

<script setup lang="ts">
import { useOrgsStore } from '@/stores/orgs'
import { useSettingsStore } from '@/stores/settings'
import { Org } from '@/types'
definePageMeta({
	title: 'Organization details',
})

const route = useRoute()
const store = useOrgsStore()
const settingsStore = useSettingsStore()
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

settingsStore.getSettings()
</script>
