<template>
	<NuxtLink
		:to="path"
		class="block h-full text-gray-900 p-6 rounded-lg shadow hover:shadow-lg transition border border-gray-200"
	>
		<div class="mb-8">
			<h2 class="text-xl font-medium">{{ props.workspace.name }}</h2>
			<span class="flex items-center gap-2 text-gray-500">{{ domain }}</span>
		</div>
		<div class="md:flex gap-8">
			<dl class="mb-2 md:mb-0">
				<dt class="uppercase text-xs text-gray-500">Status</dt>
				<dd>
					<DisplayStatus :value="props.workspace.status"></DisplayStatus>
				</dd>
			</dl>
			<dl>
				<dt class="uppercase text-xs text-gray-500">Created</dt>
				<dd>
					<DisplayDate :value="props.workspace.createdAt" />
				</dd>
			</dl>
		</div>
	</NuxtLink>
</template>

<script lang="ts" setup>
import { Workspace } from '@/types'

const props = defineProps<{
	workspace: Workspace
}>()
const path = computed(() => `ws/${props.workspace.name}`)
const domain = computed(() => `${props.workspace.subdomain}.catex.se`)
</script>
