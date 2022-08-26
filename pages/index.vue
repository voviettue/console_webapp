<template>
	<div>INDEX</div>
</template>

<script setup>
const { hasToken } = useToken()
if (hasToken()) {
	navigateTo('dashboard')
} else {
	navigateTo('sign-in')
}
</script>
