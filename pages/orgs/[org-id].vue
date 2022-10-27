<template>
	<PageWrapper>
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
</script>
