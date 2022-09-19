<template>
	<div>INDEX</div>
</template>

<script setup>
const { hasToken } = useToken()
if (hasToken()) {
	navigateTo('organizations')
} else {
	navigateTo('sign-in')
}
</script>
