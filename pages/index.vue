<template>
	<div>INDEX</div>
</template>

<script setup>
const { hasToken } = useToken()
if (hasToken()) {
	// @TODO retreive user group to detect org id
	const orgId = 'catex'
	navigateTo(`/orgs/${orgId}/overview`)
} else {
	navigateTo('sign-in')
}
</script>
