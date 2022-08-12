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
const { useUserStore, useSettingStore } = useStore()
const { hydrate: userHydrate } = useUserStore()
const { hydrate: settingHydrate } = useSettingStore()

useHead({
	title: `${route.meta.title}`,
})

await init()

async function init() {
	try {
		await Promise.all([userHydrate(), settingHydrate()])
	} catch (err) {
		// do nothing
	}
}
</script>
