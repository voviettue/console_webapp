<script lang="ts" setup>
import gt from 'semver/functions/gt'
import lt from 'semver/functions/lt'
import valid from 'semver/functions/valid'
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
import { Workspace } from '@/types'
import { useImagesStore } from '@/stores/images'
import { parseWorkspace } from '@/stores/workspaces'
import { useSettingsStore } from '@/stores/settings'

const props = defineProps<{
	item: Workspace
}>()

const { $api, $toast } = useNuxtApp()
const store = useImagesStore()
const settingsStore = useSettingsStore()
const ws = ref(props.item)
const form = ref({
	webapp: {
		version: ws.value.webapp.version,
		extVersion: ws.value.webapp.extVersion,
	},
})
const headers: TableHeader[] = [
	{ value: 'url', text: 'URL' },
	{ value: 'version', text: 'Version' },
	{ value: 'extVersion', text: 'Extension version' },
]
const isCreating = ref(false)
const isEditing = ref(false)
const isUpdating = ref(false)

async function onCreate() {
	isCreating.value = true
	try {
		const res = await $api.patch(`/api/v1alpha1/orgs/${ws.value.org}/workspaces/${ws.value.name}`, {
			webapp: {
				enabled: true,
				version: settingsStore.settings.webappVersion,
				extVersion: settingsStore.settings.webappExtVersion,
			},
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
</script>
<template>
	<TwCard>
		<div class="mb-5 flex items-center justify-between">
			<h3 class="font-semibold">Front office information</h3>
			<TwButton v-if="!isEditing && ws.webapp.enabled" variant="secondary" size="sm" @click="isEditing = true">
				Edit
			</TwButton>
		</div>
		<template v-if="ws.webapp.enabled">
			<template v-if="isEditing">
				<div class="space-y-3">
					<FormSelectImageVersion
						v-model="form.webapp.version"
						repo="gigapress/front-office"
						label="Version"
						help="You cannot revert to older versions"
					/>
					<FormSelectExtensionVersion v-model="form.webapp.extVersion" name="front-office" label="Extension version" />
				</div>
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
							class="font-normal flex items-center gap-2 link"
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
	</TwCard>
</template>
