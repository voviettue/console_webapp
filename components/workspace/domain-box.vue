<script lang="ts" setup>
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
import { Workspace } from '@/types'

const props = defineProps<{
	item: Workspace
}>()
</script>
<template>
	<h3 class="font-semibold">Domains</h3>
	<p class="mb-4">Use your own domain for your workspace for free</p>

	<div class="flex gap-3 mb-6">
		<div class="flex-1">
			<FormKit type="text" placeholder="mywebsite.com" />
		</div>
		<TwButton>Add</TwButton>
	</div>
	<TwCard>
		<div class="flex items-center gap-3">
			<a
				:href="`https://${props.item.subdomain}.catex.se`"
				target="_blank"
				class="flex items-center gap-2 text-lg text-gray-900 font-semibold hover:underline"
			>
				{{ `${props.item.subdomain}.catex.se` }}
				<ArrowTopRightOnSquareIcon class="w-5 h-5" />
			</a>
			<Badge variant="secondary">Default</Badge>
		</div>
	</TwCard>
</template>
