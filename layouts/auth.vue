<template>
	<div class="bg-gray-50 min-h-screen">
		<slot></slot>
	</div>
</template>

<script setup>
const route = useRoute()

useHead({
	title: `${route.meta.title}`,
})
</script>
