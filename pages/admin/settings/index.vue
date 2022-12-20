<script setup lang="ts">
import { Settings } from '@/types'
import { useSettingsStore } from '@/stores/settings'

definePageMeta({
	title: 'Console settings',
	middleware: ['auth'],
})

const { $api, $toast } = useNuxtApp()
const store = useSettingsStore()
const isUpdating = ref(false)

await store.getSettings()

const form = ref<Settings>({ ...store.settings })

async function onSubmit() {
	if (isUpdating.value) return
	isUpdating.value = true
	try {
		await $api.put(`/api/meta/settings`, form.value)
		store.getSettings()
		$toast.success({ title: 'Settings updated' })
	} catch (err) {
		$toast.error({ title: 'Cannot update settings', content: JSON.stringify(err.response.data) })
	}
	isUpdating.value = false
}
</script>

<template>
	<PageWrapper>
		<TwCard class="py-8">
			<div class="max-w-lg mx-auto">
				<h1 class="mb-6 font-medium text-2xl">Console settings</h1>
				<FormKit
					v-slot="{ state: { valid } }"
					type="form"
					autocomplete="off"
					method="POST"
					:actions="false"
					@submit="onSubmit"
				>
					<Divider label="App" class="my-6" />
					<div class="space-y-3">
						<FormKit v-model="form.appChartVersion" label="Chart version" type="text" />
						<FormSelectImageVersion v-model="form.appVersion" repo="gigapress/core" label="Version" />
					</div>
					<Divider label="Front office" class="my-6" />
					<div class="space-y-3">
						<FormSelectImageVersion v-model="form.webappVersion" repo="gigapress/front-office" label="Version" />
					</div>
					<Divider label="Extensions" class="my-6" />
					<div class="space-y-3">
						<FormKit v-model="form.extensionBaseVersion" label="Base version" type="text" />
						<FormKit v-model="form.extensionProVersion" label="Pro version" type="text" />
						<FormKit v-model="form.extensionFrontofficeVersion" label="Front office version" type="text" />
					</div>
					<Divider label="Ledger" class="my-6" />
					<div class="space-y-3">
						<FormKit
							v-model="form.ledgerRegion"
							label="Ledger region"
							type="select"
							:options="[
								{ label: 'US East (N. Virginia)', value: 'us-east-1' },
								{ label: 'US East (Ohio)', value: 'us-east-2' },
								{ label: 'US West (Oregon)', value: 'us-west-2' },
								{ label: 'Asia Pacific (Seoul)', value: 'ap-northeast-2' },
								{ label: 'Asia Pacific (Singapore)', value: 'ap-southeast-1' },
								{ label: 'Asia Pacific (Sydney)', value: 'ap-southeast-2' },
								{ label: 'Asia Pacific (Tokyo)', value: 'ap-northeast-1' },
								{ label: 'Canada (Central)', value: 'ca-central-1' },
								{ label: 'Europe (Frankfurt)', value: 'eu-central-1' },
								{ label: 'Europe (Ireland)', value: 'eu-west-1' },
								{ label: 'Europe (London)', value: 'eu-west-2' },
							]"
						/>
						<FormKit v-model="form.ledgerVersion" label="Version" type="text" />
						<FormKit v-model="form.ledgerExtVersion" label="Extension version" type="text" />
					</div>
					<Divider label="Other" class="my-6" />
					<div class="space-y-3">
						<FormKit v-model.number="form.maxWorkspaces" label="Max workspaces per organization" type="number" />
						<FormKit v-model="form.actionChartVersion" label="Action chart version" type="text" />
					</div>
					<div class="flex justify-end my-6">
						<TwButton type="submit" :disabled="!valid || isUpdating" :loading="isUpdating">Save</TwButton>
					</div>
				</FormKit>
			</div>
		</TwCard>
	</PageWrapper>
</template>
