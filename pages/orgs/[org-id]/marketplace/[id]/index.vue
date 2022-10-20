<template>
	<div>
		<div class="mb-8">
			<ButtonBack :to="`/orgs/${orgId}/marketplace`" text="Marketplace" />
		</div>
		<div v-if="!extension">
			<div class="flex gap-8 items-start mb-8">
				<Skeletor size="120" circle />
				<div class="space-y-3 flex-1 flex flex-col">
					<Skeletor width="100" />
					<Skeletor width="90%" />
					<Skeletor width="70%" />
					<Skeletor class="rounded-lg" width="80" height="38" />
				</div>
			</div>
			<div class="flex py-8 mb-8 gap-6 overflow-x-auto snap-x snap-mandatory">
				<div v-for="i in 4" :key="i" class="w-[250px] md:w-[400px] lg:w-[500px] snap-center shrink-0">
					<Skeletor width="100%" height="300" class="rounded-lg" />
				</div>
			</div>
		</div>
		<div v-else>
			<div class="flex gap-8 items-start mb-8">
				<div
					:style="`background-image:url(${extension.image});`"
					class="w-[100px] h-[100px] md:w-[120px] md:h-[120px] shrink-0 rounded-full bg-cover"
				></div>
				<div class="space-y-3">
					<h1 class="text-4xl font-semibold">{{ extension.title }}</h1>
					<div class="text-base">{{ extension.description }}</div>
					<TwButton class="w-full md:w-auto" variant="secondary" @click="navigateTo(`${route.fullPath}/install`)">
						Add extension
					</TwButton>
				</div>
			</div>
			<div class="flex py-8 mb-8 gap-6 overflow-x-auto snap-x snap-mandatory">
				<div v-for="i in 4" :key="i" class="w-[250px] md:w-[400px] lg:w-[500px] snap-center shrink-0">
					<img class="w-full h-auto rounded-lg" :src="`https://placehold.co/800x500/0077b6/FFFFFF?text=${i}`" />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useExtensionsStore } from '@/stores/extensions'

const store = useExtensionsStore()
const route = useRoute()
const id = route.params.id as string
const orgId = route.params.orgid as string
const extension = ref()
store.getExtension(id).then((res) => {
	extension.value = res
})
</script>
