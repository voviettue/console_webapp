<template>
	<PageWrapper>
		<template #title:prepend>
			<button
				class="mr-2 p-2 inline-flex items-center rounded-full border border-transparent bg-indigo-100 p-1 text-indigo-700 shadow-sm hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				@click="router.back()"
			>
				<ArrowLeftIcon class="w-4 h-4" />
			</button>
		</template>
		<template #title>New workspace</template>
		<FormKit
			v-slot="{ state: { valid } }"
			type="form"
			autocomplete="off"
			method="POST"
			:actions="false"
			@submit="submitHandler"
		>
			<div id="workspace-information" class="md:grid md:grid-cols-3 md:gap-6 mb-5">
				<div class="md:col-span-1">
					<div class="px-4 sm:px-0">
						<h3 class="text-lg font-medium leading-6 text-gray-900">Workspace information</h3>
						<p class="mt-1 text-sm text-gray-600"></p>
					</div>
				</div>
				<div class="mt-5 md:col-span-2 md:mt-0">
					<div class="shadow sm:overflow-hidden sm:rounded-md">
						<div class="space-y-3 bg-white px-4 py-5 sm:p-6">
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
					</div>
				</div>
			</div>
			<!-- Workspace Information -->
			<div id="app-information" class="md:grid md:grid-cols-3 md:gap-6 mb-5">
				<div class="md:col-span-1">
					<div class="px-4 sm:px-0">
						<h3 class="text-lg font-medium leading-6 text-gray-900">App information</h3>
					</div>
				</div>
				<div class="mt-5 md:col-span-2 md:mt-0">
					<div class="shadow sm:overflow-hidden sm:rounded-md">
						<div class="space-y-3 bg-white px-4 py-5 sm:p-6">
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
					</div>
				</div>
			</div>
			<!-- App -->
			<div id="front-office" class="md:grid md:grid-cols-3 md:gap-6">
				<div class="md:col-span-1">
					<div class="px-4 sm:px-0">
						<h3 class="text-lg font-medium leading-6 text-gray-900">Front-office</h3>
						<p class="mt-1 text-sm text-gray-600"></p>
					</div>
				</div>
				<div class="mt-5 md:col-span-2 md:mt-0">
					<div class="shadow sm:overflow-hidden sm:rounded-md">
						<div class="space-y-3 bg-white px-4 py-5 sm:p-6">
							<FormKit v-model="form.webappEnabled" label="Enable front-office" name="webappEnabled" type="checkbox" />
						</div>
					</div>
				</div>
			</div>
			<!-- Front office -->
			<div class="flex justify-end my-6">
				<TwButton type="submit" :disabled="!valid" :loading="isCreatingWS">Create Workspace</TwButton>
			</div>
		</FormKit>
	</PageWrapper>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import slugify from 'slugify'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'

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

const router = useRouter()
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
		navigateTo(`/organizations/${orgId}`)
	} catch (err) {
		$toast.error({ title: 'Cannot create workspace', content: JSON.stringify(err.response.data) })
	}
	isCreatingWS.value = false
}
</script>
