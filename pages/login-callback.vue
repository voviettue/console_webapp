<template>
	<pre>Getting you in...</pre>
</template>
<script setup>
definePageMeta({
	layout: 'auth',
})
const { setToken } = useToken()
const search = window.location.href
	.replace('#id_token', '?id_token')
	.replace(/^(http|https):\/\/(.*)\/login-callback/, '')
const query = new URLSearchParams(search)
const token = query.get('id_token')

if (!token) {
	navigateTo('sign-in')
} else {
	setToken(token)
	// @TODO retreive user group to detect org id
	const orgId = 'catex'
	navigateTo(`/orgs/${orgId}/overview`)
}
</script>
