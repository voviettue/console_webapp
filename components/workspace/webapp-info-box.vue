<script lang="ts" setup>
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
import { Workspace } from '@/types'

const props = defineProps<{
	item: Workspace
}>()
</script>
<template>
	<TwCard>
		<h3 class="mb-5 font-semibold">Front office</h3>
		<template v-if="props.item.webapp.enabled">
			<a
				:href="`https://app.${props.item.subdomain}.catex.se`"
				target="_blank"
				class="flex items-center gap-2 text-gray-500 hover:underline hover:text-gray-900 mb-3"
			>
				{{ `app.${props.item.subdomain}.catex.se` }}
				<ArrowTopRightOnSquareIcon class="w-5 h-5" />
			</a>
			<div class="flex items-center">
				Version&nbsp;
				<span>{{ props.item.webapp.version }}</span>
				<TwButton class="ml-4" variant="secondary" size="sm">Edit</TwButton>
			</div>
		</template>
		<template v-else>
			<TwButton>Create front office</TwButton>
		</template>
		<!-- <FormSelectImageVersion v-model="form.webapp.version" repo="front-office" /> -->
	</TwCard>
</template>
