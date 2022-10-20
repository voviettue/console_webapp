<template>
	<DatabaseList :org-id="orgId"></DatabaseList>
</template>

<script setup lang="ts">
definePageMeta({
	title: 'Databases',
	middleware: ['auth'],
})

const route = useRoute()
const orgId = route.params.orgid as string
</script>
