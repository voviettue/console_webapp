<template>
	<div>
		<div class="mb-8">
			<ButtonBack :to="`/orgs/${orgId}/overview`" text="Overview" />
		</div>
		<TwCard class="py-8">
			<div class="max-w-lg mx-auto">
				<h1 class="mb-6 font-medium text-2xl">Add a workspace</h1>
				<FormKit
					v-slot="{ state: { valid } }"
					type="form"
					autocomplete="off"
					method="POST"
					:actions="false"
					@submit="submitHandler"
				>
					<div class="space-y-3">
						<FormKit
							v-model="form.name"
							label="Workspace Name"
							name="name"
							type="text"
							placeholder="Example"
							validation="required|length:3,20|matches:/^[0-9a-z](-?[0-9a-z])*$/"
						/>
						<FormSelectMysqlInstances
							v-model="form.mysqlinstance"
							label="Database"
							name="mysqlinstance"
							placeholder="Select a MySQL instance"
							validation="required"
							:org-id="orgId"
						/>
					</div>
					<Divider class="my-4" label="App information" />
					<div class="space-y-3">
						<FormKit
							v-model="form.adminEmail"
							label="Admin email"
							name="adminEmail"
							type="email"
							placeholder="admin@example.com"
							validation="required|email"
						/>
						<FormKit
							v-model="form.adminPassword"
							label="Admin password"
							name="adminPassword"
							type="password"
							placeholder=""
							validation="required"
						/>
					</div>
					<Divider class="my-4" label="Front-office" />
					<div class="space-y-3">
						<FormKit v-model="form.webappEnabled" label="Enable front-office" name="webappEnabled" type="checkbox" />
					</div>
					<div class="flex justify-end my-6">
						<TwButton type="submit" :disabled="!valid" :loading="isCreatingWS">Create Workspace</TwButton>
					</div>
				</FormKit>
			</div>
		</TwCard>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import slugify from 'slugify'

interface WorkspacePayload {
	name: string
	mysqlinstance: string
	adminEmail: string
	adminPassword: string
	webappEnabled: boolean
}

definePageMeta({
	title: 'New workspace',
	middleware: ['auth'],
})

const route = useRoute()
const { $api, $toast } = useNuxtApp()
const orgId = route.params.orgid as string
const form = ref<WorkspacePayload>({
	name: '',
	mysqlinstance: '',
	adminEmail: '',
	adminPassword: '',
	webappEnabled: false,
})
const isCreatingWS = ref(false)

watch(
	() => form.value.name,
	(newVal) => {
		form.value.name = slugify(newVal, { lower: true })
	}
)

async function submitHandler() {
	if (isCreatingWS.value) return
	isCreatingWS.value = true
	try {
		await $api.post(`/api/v1alpha1/orgs/${orgId}/workspaces`, form.value)
		$toast.success({ title: 'Workspace has been created successfully!' })
		navigateTo(`/orgs/${orgId}/overview`)
	} catch (err) {
		$toast.error({ title: 'Cannot create workspace', content: JSON.stringify(err.response.data) })
	}
	isCreatingWS.value = false
}
</script>
