<template>
	<WorkspaceList :org-id="orgId"></WorkspaceList>
</template>

<script setup lang="ts">
definePageMeta({
	title: 'Organization overview',
})

const route = useRoute()
const orgId = route.params.orgid as string
</script>
