<template>
	<div>INDEX</div>
</template>

<script setup>
// @TODO retreive user group to detect org id
const orgId = 'catex'
navigateTo(`/orgs/${orgId}/overview`)
</script>
