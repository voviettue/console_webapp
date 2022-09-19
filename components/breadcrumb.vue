<template>
	<nav class="flex" aria-label="Breadcrumb">
		<ol role="list" class="flex items-center">
			<li v-for="(item, index) in crumbs" :key="item.path">
				<div class="flex items-center">
					<svg
						v-if="index !== 0"
						class="h-5 w-5 flex-shrink-0 text-gray-300"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 20"
						aria-hidden="true"
					>
						<path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
					</svg>
					<NuxtLink
						:to="item.path"
						:class="[item.current ? 'text-gray-900' : '', 'text-sm font-medium text-gray-500 hover:text-gray-700']"
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
