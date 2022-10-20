<template>
	<div>
		<slot />
		<Teleport to="body">
			<NotificationList />
		</Teleport>
	</div>
</template>

<script lang="ts" setup>
const route = useRoute()

useHead({
	title: `${route.meta.title}`,
})
</script>
