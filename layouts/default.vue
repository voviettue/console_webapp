<template>
	<div id="layout-wrapper">
		<PageSidebar>
			<slot>
				<NuxtPage></NuxtPage>
			</slot>
		</PageSidebar>
	</div>
</template>

<script setup>
const route = useRoute()

useHead({
	title: `${route.meta.title}`,
})
</script>
