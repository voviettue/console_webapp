<template>
	<TwCard>
		<template v-if="workspace">
			<div class="mb-4">
				<h1 class="text-xl font-medium">{{ workspace.name }}</h1>
				<a
					:href="`https://${workspace.subdomain}.catex.se`"
					target="_blank"
					class="flex items-center gap-2 text-gray-500 hover:underline hover:text-gray-900"
				>
					{{ `${workspace.subdomain}.catex.se` }}
					<ArrowTopRightOnSquareIcon class="w-5 h-5" />
				</a>
			</div>
			<div class="md:flex gap-8">
				<dl class="mb-4 md:mb-0">
					<dt class="uppercase text-xs text-gray-500">Status</dt>
					<dd>
						<DisplayStatus :value="workspace.status"></DisplayStatus>
					</dd>
				</dl>
				<dl>
					<dt class="uppercase text-xs text-gray-500">Created</dt>
					<dd>
						<DisplayDate :value="workspace.createdAt" />
					</dd>
				</dl>
			</div>
		</template>
		<template v-else>
			<div>
				<Skeletor width="100" />
			</div>
			<div class="mb-4">
				<Skeletor width="160" class="mr-2" />
				<Skeletor width="24" />
			</div>
			<div class="md:flex gap-8">
				<div>
					<div><Skeletor width="80" /></div>
					<div><Skeletor width="100" /></div>
				</div>
				<div>
					<div><Skeletor width="80" /></div>
					<div><Skeletor width="100" /></div>
				</div>
			</div>
		</template>
	</TwCard>
</template>

<script setup lang="ts">
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
const attrs = useAttrs()
const workspace = ref(attrs.workspace)
definePageMeta({
	title: 'Workspace details',
	middleware: ['auth'],
})
</script>
