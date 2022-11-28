<script lang="ts" setup>
import gt from 'semver/functions/gt'
import lt from 'semver/functions/lt'
import valid from 'semver/functions/valid'
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
import { Workspace } from '@/types'
import { useImagesStore } from '@/stores/images'
import { parseWorkspace } from '@/stores/workspaces'

const props = defineProps<{
	item: Workspace
}>()

const { $api, $toast } = useNuxtApp()
const store = useImagesStore()
const ws = ref(props.item)
const form = ref({
	webapp: {
		version: ws.value.webapp.version,
	},
})
const headers: TableHeader[] = [
	{ value: 'url', text: 'URL' },
	{ value: 'version', text: 'Version' },
]
const isCreating = ref(false)
const isEditing = ref(false)
const isUpdating = ref(false)

async function onCreate() {
	isCreating.value = true
	try {
		// await store.getImages('front-office')
		// const imageFrontOfficeVersion = store.sortedImages('front-office')[0]
		const extFrontOfficeVersion = await getLatestExtFrontOfficeVersion()
		const res = await $api.patch(`/api/v1alpha1/orgs/${ws.value.org}/workspaces/${ws.value.name}`, {
			webapp: {
				enabled: true,
				// version: imageFrontOfficeVersion.tag,
			},
			extensions: [
				...ws.value.extensions,
				{
					name: '@giga-extensions/front-office',
					version: extFrontOfficeVersion,
				},
			],
		})
		ws.value = parseWorkspace(res.data.data)
		$toast.success({ title: 'Front office created' })
	} catch (err) {
		$toast.error({ title: 'Cannot create front office' })
	}
	isCreating.value = false
}

async function onSubmit() {
	isUpdating.value = true
	try {
		const res = await $api.patch(`/api/v1alpha1/orgs/${ws.value.org}/workspaces/${ws.value.name}`, {
			webapp: { ...form.value.webapp },
		})
		ws.value = parseWorkspace(res.data.data)
		isEditing.value = false
		$toast.success({ title: 'Front office updated' })
	} catch (err) {
		$toast.error({ title: 'Front office updates failed' })
	}
	isUpdating.value = false
}

async function getLatestExtFrontOfficeVersion() {
	const res = await $api.get(`/api/meta/extensions/front-office/versions`)
	const versions = res.data.data
		.filter((e) => !e.version.endsWith('dev'))
		.sort((a, b) => {
			if (!valid(a.version) || !valid(b.version)) return 0
			if (gt(a.version, b.version)) return -1
			if (lt(a.version, b.version)) return 1
			return 0
		})
	return versions[0].version
}
</script>
<template>
	<TwCard>
		<div class="mb-5 flex items-center justify-between">
			<h3 class="font-semibold">Front office information</h3>
			<TwButton v-if="!isEditing" variant="secondary" size="sm" @click="isEditing = true">Edit</TwButton>
		</div>
		<template v-if="ws.webapp.enabled">
			<template v-if="isEditing">
				<FormSelectImageVersion
					v-model="form.webapp.version"
					repo="front-office"
					label="Version"
					help="You cannot revert to older versions"
				/>
				<div class="mt-6 flex justify-end gap-3">
					<TwButton :loading="isUpdating" :disabled="isUpdating" @click="onSubmit">Update</TwButton>
					<TwButton variant="secondary" @click="isEditing = false">Cancel</TwButton>
				</div>
			</template>
			<template v-else>
				<TwList :headers="headers" :item="ws.webapp">
					<template #item-url="{ item }">
						<a
							:href="`https://app.${item.subdomain}.catex.se`"
							target="_blank"
							class="font-normal flex items-center gap-2 link mb-3"
						>
							{{ `app.${ws.subdomain}.catex.se` }}
							<ArrowTopRightOnSquareIcon class="w-5 h-5" />
						</a>
					</template>
				</TwList>
			</template>
		</template>
		<template v-else>
			<TwButton :loading="isCreating" :disabled="isCreating" @click="onCreate">Create front office</TwButton>
		</template>
		<!--<FormSelectImageVersion v-model="form.webapp.version" repo="front-office" />-->
	</TwCard>
</template>
