<template>
	<nav class="flex" aria-label="Breadcrumb">
		<ol role="list" class="flex items-center">
			<li v-for="(item, index) in crumbs" :key="item.path">
				<div class="flex items-center">
					<svg
						v-if="index !== 0"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						class="mx-1 text-gray-400 w-4 h-4"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
					</svg>
					<span v-if="item.current">{{ item.title }}</span>
					<NuxtLink
						v-else
						:to="item.path"
						class="text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline"
					>
						{{ item.title }}
					</NuxtLink>
				</div>
			</li>
		</ol>
	</nav>
</template>

<script lang="ts" setup>
import startCase from 'lodash/startCase'
const route = useRoute()
const router = useRouter()
const params = route.fullPath.startsWith('/') ? route.fullPath.substring(1).split('/') : route.fullPath.split('/')
const crumbs = []
let path = ''
params.forEach((param) => {
	path = `${path}/${param}`

	const r = router.resolve(path)
	if (r.matched.length) {
		crumbs.push({
			title: startCase(param.replace(/-/g, ' ')),
			path,
			current: route.fullPath === path,
		})
	}
})
</script>
